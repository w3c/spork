
var fs = require("fs")
,   pth = require("path")
,   rfs = function (file) { return fs.readFileSync(pth.join(__dirname, "..", file), "utf8"); }
;

exports.name = "fork-main-element";
exports.landscape = "W3C HTML has a different definition for the <main> element.";
exports.transform = function (tmpl) {
    $("#the-main-element")
        .parent()
        .replaceWith(tmpl.main)
    ;
    // body isn't the main content
    var $p = $("#the-body-element").parent().find("> p:contains('main'):first");
    $p.html($p.html().replace("main", ""));
    window.info("FORK: " + exports.landscape);
};
exports.params = function () {
    return [{
        main: rfs("res/the-main-element.html")
    }];
};
