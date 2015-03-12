
var exec = require("child_process").exec;

exports.rsync = function (config, cb) {
    if (config.rsync) {
        var cmd = "rsync -avz --delete -e ssh " + config.rsync.local + " " + config.rsync.remote;
        console.log("Running:", cmd);
        exec(cmd, function (err) {
            if (err) throw err;
            cb();
        });
    }
    else cb();
};
