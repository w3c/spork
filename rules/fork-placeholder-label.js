
var rfs = require("../lib/rfs");

exports.name = "fork-placeholder-label";
exports.landscape = "W3C HTML warns more strongly about using @placeholder for labelling.";
exports.transform = function (data) {
    $("#the-placeholder-attribute")
        .parent()
        .find("p:eq(1)")
        .replaceWith(data.warning)
    ;

    window.info("FORK: " + exports.landscape);
};
exports.params = function () {
    return [{
        warning: rfs("res/the-placeholder-attribute/label-warning.html")
    }];
};
