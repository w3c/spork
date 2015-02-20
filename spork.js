#!/usr/bin/env node
/*jshint -W054 */

var Nightmare = require("nightmare")
,   fs = require("fs-extra")
,   jn = require("path").join
,   rfs = function (file) { return fs.readFileSync(jn(__dirname, file), "utf8"); }
,   wfs = function (file, content) { return fs.writeFileSync(file, content, "utf8"); }
,   spawn = require("child_process").spawn
,   winston = require("winston")
,   logger = new (winston.Logger)({
                        transports: [
                            new (winston.transports.Console)({
                                    handleExceptions:   true
                                ,   colorize:           true
                                ,   maxsize:            200000000
                                })
                        ]
                    }
    )
,   die = function (str) {
        // XXX here is where reporting takes place if needed
        logger.error(str);
        process.exit(1);
    }
;

exports.run = function (profile, outDir) {
    var processResources = true
    ,   copy = {}
    ,   fails = {}
    ;
    logger.info("Loading " + profile.url);
    
    // building up the injection script
    var sporkCode = "";
    sporkCode += rfs("node_modules/jquery/dist/jquery.js") + "\n";
    // Phantom doesn't support new URL(), Rodney to the rescue!
    sporkCode += rfs("node_modules/URIjs/src/URI.js") + "\n";
    sporkCode += "try {\n";
    sporkCode += rfs("lib/injected-helpers.js") + "\n";
                 
    
    profile.rules.forEach(function (rule) {
        sporkCode += "window.info('~~~~~~~~~~~ " + rule.name + " ~~~~~~~~~~');\n";
        sporkCode += "curRule = '" + rule.name + "';\n";
        sporkCode += "(";
        sporkCode += rule.transform.toString();
        sporkCode += ")(";
        if (rule.params) {
            sporkCode += rule.params(profile.configuration)
                            .map(function (prm) {
                                return JSON.stringify(prm, null, 4);
                            })
                            .join(", ")
            ;
        }
        sporkCode += ");\n";
        if (rule.landscape) sporkCode += "window.info(\"" + rule.landscape + "\");\n";
        sporkCode += "window.info('___________ /" + rule.name + " ___________');\n";
        if (rule.copy) for (var k in rule.copy) copy[k] = rule.copy[k];
    });
    sporkCode += "return { ok: true };\n";
    sporkCode += "} catch (e) { return { error: e }; }\n";
    
    var nm = new Nightmare({
        cookieFile: jn(__dirname, "data/cookies.txt")
    });
    nm.on("callback", function (msg) {
        if (msg.info) logger.info(msg.info);
        else if (msg.warn) logger.warn(msg.warn);
        else if (msg.assert) {
            logger.error("Assertion failed in " + msg.curRule + ": " + msg.assert);
            if (!fails[msg.curRule]) fails[msg.curRule] = [];
            fails[msg.curRule].push(msg.assert);
        }
        else if (msg.source) {
            logger.info("Saving source");
            wfs(jn(outDir, "index.html"), msg.source);
        }
        else if (msg.unplug) processResources = false;
    });
    if (profile.resources) nm.on("resourceRequested", function (res) {
        if (processResources) profile.resources(res);
    });
    nm.goto(profile.url);
    wfs(jn(__dirname, "debug-script.js"), sporkCode);
    nm.evaluate(
        new Function(sporkCode)
    ,   function (res) {
            if (res.ok) logger.info("Injection ok");
            if (res.error) logger.error(res.error);
        }
    );
    
    var done = function () {
        if (Object.keys(fails).length) {
            // XXX
            //  - here we can report errors more aggressively depending on the profile's configuration
            //  - we should also report on dangling IDs
            var str = ["There were assertion errors during processing."];
            for (var k in fails) {
                str.push("Rule " + k + ":");
                fails[k].forEach(function (ass) { str.push("\t" + ass); });
            }
            logger.error(str.join("\n"));
        }
        else logger.info("Ok!");
    };
    
    nm.run(function (err) {
        if (err) die(err);
        logger.info("There are " + Object.keys(profile.configuration.downloads).length + " items to download");
        var config = Object.keys(profile.configuration.downloads) // XXX here we could filter out resource we have
                        .map(function (it) {
                            return  'url = "' + it + '"\n' +
                                    'output = "' + jn(outDir, profile.configuration.downloads[it]) + '"\n' +
                                    'create-dirs';
                        }).join("\n\n")
        ;
        // change the second and third "pipe" to 1, 2 to get stdout/stderr back out to the console
        if (config) {
            var curl = spawn("curl", ["-L", "--config", "-"], { stdio: ["pipe", "pipe", "pipe"] });
            curl.stdin.end(config);
            curl.on("exit", function () {
                logger.info("Copying");
                for (var k in copy) fs.copySync(jn(__dirname, "res", k), jn(outDir, copy[k]));
                done();
            });
        }
        else done();
    });
};

// running directly
if (!module.parent) {
    var profile = process.argv[2]
    ,   outDir = process.argv[3]
    ;
    if (!profile || !outDir) die("Usage: spork profile outdir");
    try         { profile = require("./profiles/" + profile); }
    catch (e)   { die("Profile '" + profile + "' failed to load.\n" + e); }
    if (!fs.existsSync(outDir)) die("Directory " + outDir + " not found.");
    exports.run(profile, outDir);
}
