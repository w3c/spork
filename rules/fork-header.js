
var rfs = require("../lib/rfs");

exports.name = "fork-header";
exports.landscape = "W3C HTML has different representations for header elements.";
exports.transform = function (data) {
    $("#the-header-element")
        .parent()
        .find("> p:first")
        .replaceWith(data.header)
    ;

    window.info("FORK: " + exports.landscape);
};
exports.params = function () {
    return [{
        header: rfs("res/the-header-element/header.html")
    }];
};
