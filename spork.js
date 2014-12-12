#!/usr/bin/env node

var Nightmare = require("nightmare")
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
//  - rules:
//      - strip script and on*
//      - run the outline algorithm (external module, check if exists) and turn content into sections
//          - this may run into trouble with some of the div sections, we'll see
//      - boilerplate
//      - drop sections 
//      - change stuff
//      - boilerplate
//      - update refs
//      - section renumbering, new ToC
//      - "how this specification is produced" section
//      - grab what images (and other dependencies) are needed
//  - each rule has documentation about what it forks, this can be extracted to make the landscape
//  - each rule has assertions that are reported as errors (which can get emailed) if there's a problem
//  - profiles can specify things such as who to report to
//  - hidden configuration
//  - output is single-page only

//  - in case jsdom doesn't work, use Nightmare

exports.run = function (profile) {
    logger.info("Loading " + profile.url);
    var nm = new Nightmare();
    nm.on("callback", function (msg) {
        if (msg.info) logger.info(msg.info);
    });
    nm.goto(profile.url);
    profile.rules.forEach(function (rule) {
        nm.evaluate(
            rule.transform
        ,   function (res) {
                if (res.error) die(res.error);
            }
        );
        // set this to a selector to signal completion
        if (rule.wait) nm.wait(rule.wait);
    });
    nm.run(function (err) {
        if (err) die(err);
        // XXX save the doc!
        logger.info("Ok!");
    });
};

// running directly
if (!module.parent) {
    var profile = process.argv[2];
    if (!profile) die("A profile name is required.");
    try {
        profile = require("./profiles/" + profile);
    }
    catch (e) {
        die("Profile '" + profile + "' not found.");
    }
    exports.run(profile);
}
