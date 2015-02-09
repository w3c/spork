#!/usr/bin/env node

var Nightmare = require("nightmare")
,   fs = require("fs")
,   jn = require("path").join
,   rfs = function (file) { return fs.readFileSync(jn(__dirname, file), "utf8"); }
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
    logger.info("Loading " + profile.url);
    
    // building up the injection script
    var script = rfs("node_modules/jquery/dist/jquery.js") + "\n";
    script += "function info (str) { window.callPhantom({ info: info }); }\n";
    profile.rules.forEach(function (rule) {
        script += "info('Running " + rule.name + "');\n";
        script += rule.transform.toString();
        script += "(";
        if (rule.params) {
            script += rule.params(profile.configuration)
                            .map(function (prm) {
                                return JSON.stringify(prm, null, 4);
                            })
                            .join(", ")
            ;
        }
        script += ")\n";
        script += "info('Done with " + rule.name + "');\n";
    });
    
    var nm = new Nightmare({
        cookieFile: jn(__dirname, "data/cookies.txt")
    });
    nm.on("callback", function (msg) {
        if (msg.info) logger.info(msg.info);
        else if (msg.source) {
            fs.writeFileSync(jn(outDir, "index.html"), msg.source, "utf8");
        }
    });
    if (profile.resources) nm.on("resourceRequested", profile.resources);
    nm.goto(profile.url);
    nm.evaluate(
        function () {
            try {
                var s = document.createElement("script");
                s.textContent = script;
                document.body.appendChild(s);
                return { ok: true };
            }
            catch (e) {
                return { error: e };
            }
        }
    ,   function (res) {
            if (res.ok) console.log("Injection ok");
            if (res.error) console.error("[ERROR]", res.error);
        }
    );
    
    nm.run(function (err) {
        console.log("There are " + Object.keys(profile.configuration.downloads).length + " items to download");
        console.log(profile.configuration.downloads);
        if (Object.keys(profile.configuration.downloads).length) {
            var config = Object.keys(profile.configuration.downloads) // XXX here we could filter out resource we have
                            .map(function (it) {
                                return  'url = "' + it + '"\n' +
                                        'output = "' + jn(outDir, profile.configuration.downloads[it]) + '"\n' +
                                        'create-dirs';
                            }).join("\n\n")
            ;
            if (config) spawn("curl", ["-L", "--config", "-"], { stdio: ["pipe", 1, 2] }).stdin.end(config);
        }
        if (err) die(err);
        logger.info("Ok!");
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
