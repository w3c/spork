#!/usr/bin/env node

var fs = require("fs")
,   jn = require("path").join
,   sua = require("superagent")
,   jsdom = require("jsdom")
,   tmp = require("tmp")
,   die = function (str) {
        console.error(str);
        process.exit(1);
    }
;

// XXX
//  - grab the source
//  - save it locally to a tmp dir of its own
//  - load a profile, which applies some rules
//  - possible profiles
//      - master
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
    console.log("yay!");
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
