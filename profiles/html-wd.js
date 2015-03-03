
var fs = require("fs")
,   jn = require("path").join
;

module.exports = require("./html");
module.exports.configuration.title = "HTML 5.1";
module.exports.configuration.specStatus = "WD";

module.exports.finalise = function (config, specFiles, otherFiles, cb) {
    var content = specFiles.join("\n") + "\n" + otherFiles.join("\n") + "\n";
    fs.writeFileSync(jn(config.outDir, "manifest.txt"), content, "utf8");
    cb();
};
