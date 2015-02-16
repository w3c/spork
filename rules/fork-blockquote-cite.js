
var fs = require("fs")
,   pth = require("path")
,   rfs = function (file) { return fs.readFileSync(pth.join(__dirname, "..", file), "utf8"); }
;

exports.name = "fork-blockquote-cite";
exports.landscape = "W3C HTML attributes different semantics to cite inside blockquote.";
exports.transform = function (tmpl) {
    for (var k in tmpl) $("#" + k).parent().replaceWith(tmpl[k]);
    window.info("FORK: " + exports.landscape);
};
exports.params = function () {
    return [{
        "the-cite-element":         rfs("res/the-cite-element.html")
    ,   "the-blockquote-element":   rfs("res/the-blockquote-element.html")
    }];
};
