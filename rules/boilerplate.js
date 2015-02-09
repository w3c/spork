/* globals info */

var fs = require("fs")
,   pth = require("path")
,   rfs = function (file) { return fs.readFileSync(pth.join(__dirname, "..", file), "utf8"); }
;

exports.name = "boilerplate";
exports.landscape = "A different title and boilerplate suitable for W3C.";
exports.transform = function (options) {
    // title
    $("title").text(options.title);
    info("changed title");

    // style
    $("<style></style>")
        .text(options.style)
        .appendTo($("head"))
    ;
    $('<link href="http://www.w3.org/StyleSheets/TR/W3C-ED" rel="stylesheet" type="text/css">')
        .appendTo($("head"));
    info("injected style");

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
    $("body hr").first().before(bp);
    info("updated boilerplate");
};
exports.params = function (conf) {
    return [{
        boilerplate:    conf.boilerplate ? rfs(conf.boilerplate) : ""
    ,   style:          conf.style ? rfs(conf.style) : ""
    ,   title:          conf.title || ""
    }];
};
