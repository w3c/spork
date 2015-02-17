
var rfs = require("../lib/rfs");

exports.name = "fork-license-main";
exports.landscape = "W3C HTML has a SHOULD requirement on indication of link type 'license' scope in text and a different code example using the main element.";
exports.transform = function (data) {
    $("#link-type-license")
        .parent()
        .find("div.example:first").remove().end()
        .find("p:eq(2)")
        .replaceWith(data.main)
    ;
};
exports.params = function () {
    return [{
        main: rfs("res/link-type-license/main.html")
    }];
};
