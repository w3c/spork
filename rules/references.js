
// var fs = require("fs")
// ,   pth = require("path")
// ,   rfs = function (file) { return fs.readFileSync(pth.join(__dirname, "..", file), "utf8"); }
// ;

exports.name = "references";
exports.landscape = "Unused references are dropped; some are changed to match W3C preferences.";
exports.transform = function () {
    $("#ref-list dt[id]").each(function () {
        var $dt = $(this)
        ,   $dd = $dt.next("dd")
        ,   id = $dt.attr("id")
        ;
        if (!id) return;
        if (!$("a[href='#" + id + "']").length) {
            $dt.remove();
            $dd.remove();
            window.info("Dropping reference " + $dt.text());
        }
    });
    window.info("dropped unused references");
};
// exports.params = function (conf) {
//     return [{
//         boilerplate:    conf.boilerplate ? rfs(conf.boilerplate) : ""
//     ,   style:          conf.style ? rfs(conf.style) : ""
//     ,   title:          conf.title || ""
//     }];
// };
