
var rfs = require("../lib/rfs");

exports.name = "fork-links-in-labels";
exports.landscape = "W3C HTML warns against links in labels";
exports.transform = function (tmpl) {
    // inject a complete section before #text-tracks-describing-chapters
    $("#the-label-element")
        .parent()
        .find("div.example:first")
        .after(tmpl.links)
    ;

    window.info("FORK: " + exports.landscape);
};
exports.params = function () {
    return [{
        links: rfs("res/the-label-element/links-in-labels.html")
    }];
};
