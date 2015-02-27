/*global assert*/

var rfs = require("../lib/rfs")
,   hb = require("handlebars")
;

exports.name = "boilerplate";
exports.landscape = "A different title and boilerplate corresponding to a W3C publication.";
exports.transform = function (data) {
    // charset
    assert("There's a head", $("head")).prepend($("<meta charset='utf-8'>"));

    // title
    assert("There's a title", $("title")).text(data.title);
    window.info("changed title");

    // style
    $("<style></style>")
        .text(data.style)
        .appendTo($("head"))
    ;
    $('<link href="http://www.w3.org/StyleSheets/TR/W3C-ED" rel="stylesheet" type="text/css">')
        .appendTo($("head"));
    window.info("injected style");

    // boilerplate
    assert("First <hr>", $("body hr:first"))
        .before(data.boilerplate)
        .after(data.sotd)
        .after(data.abstract)
    ;
    
    window.info("updated boilerplate");
};
exports.params = function (conf) {
    var date = new Date()
    ,   humanMonths = "January February March April May June July August September October November December".split(" ")
    ,   pad = function (num) {
            num = "" + num;
            if (num.length < 2) return "0" + num;
            return num;
        }
    ,   statuses = {
            ED: "Editor's Draft"
        ,   WD: "Working Draft"
        }
    ,   data = {
            humanDate:  pad(date.getDate()) + " " + humanMonths[date.getMonth()] + " " + date.getFullYear()
        ,   title:      conf.title || ""
        ,   status:     statuses[conf.specStatus]
        ,   year:       date.getFullYear()
        }
    ,   template = function (str) {
            return hb.compile(str)(data);
        }
    ;
    
    return [{
        boilerplate:    template(conf.boilerplate ? rfs(conf.boilerplate) : "")
    ,   abstract:       template(conf.abstract ? rfs(conf.abstract) : "")
    ,   sotd:           template(conf.sotd ? rfs(conf.sotd) : "")
    ,   style:          conf.style ? rfs(conf.style) : ""
    ,   title:          conf.title || ""
    }];
};
