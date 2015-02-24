/*global assert*/

var rfs = require("../lib/rfs");

exports.name = "fork-history";
exports.landscape = "W3C HTML has a different definition for the <main> element.";
exports.transform = function (data) {
    assert("The History section",
    $("#history-2")
        .parent())
        .replaceWith(data.section)
    ;
};
exports.params = function () {
    return [{
        section: rfs("res/history.html")
    }];
};
