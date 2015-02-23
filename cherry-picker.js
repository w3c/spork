#!/usr/bin/env node

var spork = require("./spork")
,   fs = require("fs-extra")
,   pth = require("path")
,   exec = require("child_process").exec
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
,   cacheFile = jn(config.outDir, "last-html-sha.txt")
;

function nullifyCache () {
    log.info("Creating/resetting cache file: " + cacheFile);
    fs.writeFileSync(cacheFile, "this is not a sha", "utf8");
}

if (!fs.existsSync(cacheFile)) nullifyCache();

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
repo.getCommits()
    .then(function (commits) {
        var lastRun = fs.readFileSync(cacheFile, "utf8")
        ,   lastCommit = commits[0].sha
        ;
        log.info("Last processed commit: " + lastRun + ", last GH commit: " + lastCommit);
        if (lastCommit !== lastRun) {
            fs.writeFileSync(cacheFile, lastCommit, "utf8");
            run();
        }
        else {
            log.info("Nothing to report, going back to sleep.");
        }
    })
;

// check for self-updates
if (config.production) {
    var repo = gh.getRepo("darobin", "spork");
    repo.getCommits()
        .then(function (commits) {
            exec("git log -1", { cwd: __dirname }, function (err, stdout) {
                if (err) log.error("Problem getting the git log: " + err);
                var lastRun = stdout.replace(/^commit\s+/, "").replace(/\n[\s\S]+/, "")
                ,   lastCommit = commits[0].sha
                ;
                log.info("Last fetched commit: " + lastRun + ", last GH commit: " + lastCommit);
                if (lastCommit !== lastRun) {
                    exec("git pull", { cwd: __dirname }, function (err) {
                        if (err) log.error("Problem updating spork code: " + err);
                        nullifyCache();
                        log.info("Spork updated");
                    });
                }
                else {
                    log.info("Nothing to update.");
                }
            });
        })
    ;
}
