/*global assert*/

var rfs = require("../lib/rfs");

exports.name = "fork-aria";
exports.landscape = "Different ARIA role constraints in W3C HTML.";
exports.transform = function (data) {
    assert("#wai-aria",
    $("#wai-aria")
        .parent())
        .replaceWith(data.main)
    ;
};
exports.params = function () {
    return [{
        main: rfs("res/aria/mappings.html")
    }];
};
