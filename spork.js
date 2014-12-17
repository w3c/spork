#!/usr/bin/env node

var Nightmare = require("nightmare")
,   fs = require("fs")
,   jn = require("path").join
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

// XXX
//  - possible profiles
//      - html (master)
//      - canvas
//      - shipping (the subset whenever we want to ship)
//
//  - rules:
//      - drop sections 
//      - boilerplate
//      - change stuff
//      - "how this specification is produced" section
//      - update refs
//      - section renumbering, new ToC
//      - grab what images (and other dependencies) are needed
//  - each rule has documentation about what it forks, this can be extracted to make the landscape
//  - each rule has assertions that are reported as errors (which can get emailed) if there's a problem
//  - profiles can specify things such as who to report to

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
    nm.goto(profile.url);
    
    profile.rules.forEach(function (rule) {
        nm.evaluate(
            rule.transform
        ,   function (res) {
                if (!res) die("Rule '" + rule.name + "' did not produce any result — this means it blew up.");
                if (res && res.error) die(res.error);
            }
        );
        // set this to a selector to signal completion
        if (rule.wait) nm.wait(rule.wait);
    });
    nm.run(function (err) {
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
    catch (e)   { die("Profile '" + profile + "' failed to load."); }
    if (!fs.existsSync(outDir)) die("Directory " + outDir + " not found.");
    exports.run(profile, outDir);
}
