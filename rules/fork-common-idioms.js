/*global assert*/

var rfs = require("../lib/rfs");

exports.name = "fork-common-idioms";
exports.landscape = "Different advice for some common idioms like breadcrumbs and subheadings.";
exports.transform = function (data) {
    assert("Section: The main part...", $("#the-main-part-of-the-content").parent()).replaceWith(data.subHeadings);
    assert("Section: Breadcrumbs", $("#rel-up").parent()).replaceWith(data.breadcrumbs);
};
exports.params = function () {
    return [{
        breadcrumbs:    rfs("res/common-idioms/breadcrumbs.html")
    ,   subHeadings:    rfs("res/common-idioms/sub-headings.html")
    }];
};
exports.copy = {};
"breadcrumb.png htmlheading.png lotr.png ramones.png themonth.gif title-tagline.jpg"
    .split(" ")
    .forEach(function (it) {
        exports.copy["common-idioms/" + it] = "images/" + it;
    })
;
