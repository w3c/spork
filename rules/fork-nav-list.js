
var rfs = require("../lib/rfs");

exports.name = "fork-nav-list";
exports.landscape = "W3C HTML suggests using lists in nav elements.";
exports.transform = function (data) {
    $("#the-nav-element").parent().find("p:first").after(data.note);
};
exports.params = function () {
    return [{
        note: rfs("res/the-nav-element/note.html")
    }];
};
