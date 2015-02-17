
var rfs = require("../lib/rfs");

exports.name = "fork-section-headings";
exports.landscape = "W3C HTML has a SHOULD on using headings for sections.";
exports.transform = function (data) {
    var $p = $("#the-section-element").parent().find("p:first");
    $p.html($p.html().replace(/,\s+typically\s+with\s+a\s+heading./, data.typically));

    $("#the-h1\\,-h2\\,-h3\\,-h4\\,-h5\\,-and-h6-elements")
        .parent()
        .find("div.example")
        .before(data.subheadings)
    ;
};
exports.params = function () {
    return [{
        typically: rfs("res/section-headings/typically.html")
    ,   subheadings: rfs("res/section-headings/subheadings.html")
    }];
};
