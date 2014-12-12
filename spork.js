#!/usr/bin/env node

var fs = require("fs")
,   jn = require("path").join
,   sua = require("superagent")
,   Response = require("superagent/lib/node/response")
,   jsdom = require("jsdom")
,   winston = require("winston")
,   tmp = require("tmp")
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

exports.process = function (profile, file) {
    logger.info("Processing " + file);
    jsdom.env(  file
            ,   function (errors, window) {
                    var currentRule = 0
                    ,   nextRule = function (err) {
                            if (err) die(err);
                            var rule = profile.rules[currentRule];
                            if (!rule) return logger.info("Done.");
                            currentRule++;
                            rule.transform(window.document, { profile: profile, logger: logger }, nextRule);
                        }
                    ;
                    nextRule();
                }
    );
};


exports.run = function (profile) {
    tmp.dir({ unsafeCleanup: true }, function (err, dir) {
        logger.info("Using tmpdir " + dir);
        if (err) die(err);
        var outFile = jn(dir, "index.html")
        ,   out = fs.createWriteStream(outFile);
        logger.info("Fetching " + profile.url);
        var request = sua.get(profile.url);
        request
            .on("error", function (err) { die(err.message); })
            .on("end", function () {
                var res = new Response(request);
                if (res.error) die(res.error.message);
                exports.process(profile, outFile); })
            .pipe(out);
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
