/*global assert*/

var rfs = require("../lib/rfs");

exports.name = "fork-main-element";
exports.landscape = "W3C HTML has a different definition for the <main> element.";
exports.transform = function (tmpl) {
    assert("<main>",
    $("#the-main-element")
        .parent())
        .replaceWith(tmpl.main)
    ;
    // body isn't the main content
    var $p = assert("<p> with 'main' in <body>", $("#the-body-element").parent().find("> p:contains('main'):first"));
    $p.html($p.html().replace("main", ""));
};
exports.params = function () {
    return [{
        main: rfs("res/the-main-element.html")
    }];
};
