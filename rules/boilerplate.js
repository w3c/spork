/*global assert*/

var rfs = require("../lib/rfs");

exports.name = "boilerplate";
exports.landscape = "A different title and boilerplate suitable for W3C.";
exports.transform = function (options) {
    // charset
    assert("There's a head", $("head")).prepend($("<meta charset='utf-8'>"));

    // title
    assert("There's a title", $("title")).text(options.title);
    window.info("changed title");

    // style
    $("<style></style>")
        .text(options.style)
        .appendTo($("head"))
    ;
    $('<link href="http://www.w3.org/StyleSheets/TR/W3C-ED" rel="stylesheet" type="text/css">')
        .appendTo($("head"));
    window.info("injected style");

    // boilerplate
    var date = new Date()
    ,   humanMonths = "January February March April May June July August September October November December".split(" ")
    ,   pad = function (num) {
            num = "" + num;
            if (num.length < 2) return "0" + num;
            return num;
        }
    ,   humanDate = pad(date.getDate()) + " " + humanMonths[date.getMonth()] + " " + date.getFullYear()
    ,   bp = options.boilerplate
                    .replace(/\{\{humanDate}}/g, humanDate)
                    .replace(/\{\{year}}/g, date.getFullYear())
    ;
    assert("First <hr>", $("body hr:first"))
        .before(bp)
        .after(options.sotd)
        .after(options.abstract)
    ;
    
    window.info("updated boilerplate");
};
exports.params = function (conf) {
    return [{
        boilerplate:    conf.boilerplate ? rfs(conf.boilerplate) : ""
    ,   abstract:       conf.abstract ? rfs(conf.abstract) : ""
    ,   sotd:           conf.sotd ? rfs(conf.sotd) : ""
    ,   style:          conf.style ? rfs(conf.style) : ""
    ,   title:          conf.title || ""
    }];
};
