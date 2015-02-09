#!/usr/bin/env node

var Nightmare = require("nightmare")
,   fs = require("fs")
,   jn = require("path").join
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
    
    profile.rules.forEach(function (rule) {
        var runArgs = [
            rule.transform
        ,   function (res) {
                if (!res) die("Rule '" + rule.name + "' did not produce any result — this means it blew up.");
                if (res && res.error) die(res.error);
            }
        ];
        if (rule.params) runArgs = runArgs.concat(rule.params(profile.configuration));
        nm.evaluate.apply(nm, runArgs);
        // set this to a selector to signal completion
        if (rule.wait) nm.wait(rule.wait);
    });
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
