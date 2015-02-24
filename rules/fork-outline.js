/*global assert*/

var rfs = require("../lib/rfs");

exports.name = "fork-outline";
exports.landscape = "W3C HTML features a warning about the outline algorithm's actual usability.";
exports.transform = function (data) {
    assert("Creating an outline",
    $("#outline")
        .parent())
        .prepend(data.warning)
    ;
};
exports.params = function () {
    return [{
        warning:    rfs("res/outline-warning.html")
    }];
};
