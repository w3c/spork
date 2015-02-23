#!/usr/bin/env node

var spork = require("./spork")
,   fs = require("fs-extra")
,   pth = require("path")
,   jn = pth.join
,   nopt = require("nopt")
,   Octokit = require("octokit")
,   gh = Octokit.new()
,   log = require("./lib/logger")
,   knownOpts = {
                config:     pth
            ,   force:      Boolean
    }
,   shortHands = {
                f:      ["--force"]
            ,   c:      ["--config"]
    }
,   options = nopt(knownOpts, shortHands, process.argv, 2)
,   config = require(options.config)
,   cacheFile = jn(config.outDir, "last-sha.txt")
;

if (!fs.existsSync(cacheFile)) {
    log.info("Creating missing cache file: " + cacheFile);
    fs.writeFileSync(cacheFile, "42", "utf8");
}

// give spork a reporter; on error send email
function run () {
    log.info("Running Spork");
    spork.run(
        require("./profiles/html")
    ,   config.outDir
    );
}
if (options.force) return run();

// check last commit
var repo = gh.getRepo("whatwg", "html-mirror");
repo.getCommits({})
    .then(function (commits) {
        var lastRun = fs.readFileSync(cacheFile, "utf8");
        log.info("Last processed commit: " + lastRun + ", last GH commit: " + commits[0]);
        if (commits[0] !== lastRun) {
            fs.writeFileSync(cacheFile, commits[0], "utf8");
            run();
        }
    })
;

