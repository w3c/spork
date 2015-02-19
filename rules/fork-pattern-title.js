/*global assert*/

var rfs = require("../lib/rfs");

exports.name = "fork-pattern-title";
exports.landscape = "W3C HTML advises against using solely @title to describe @pattern.";
exports.transform = function (data) {
    assert("First § in the pattern attribute",
    $("#the-pattern-attribute")
        .parent()
        .find("div.example:first"))
        .before(data.warning)
    ;
};
exports.params = function () {
    return [{
        warning: rfs("res/the-pattern-attribute/title-warning.html")
    }];
};
