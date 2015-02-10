
var fs = require("fs")
,   pth = require("path")
,   rfs = function (file) { return fs.readFileSync(pth.join(__dirname, "..", file), "utf8"); }
;

exports.name = "aria-steve";
exports.landscape = "Extra information concerning ARIA is added to all elements.";
exports.transform = function (data) {
    for (var k in data) {
        var $lastDT = $("#" + k).next("dl.element")
                                .find("dt")
                                .last()
        ;
        if (!$lastDT.length) {
            window.info("No DL found for " + k);
            return;
        }
        $lastDT
            .before("<dt>Allowed <a href='#aria-role-attribute'>ARIA role attribute</a> values:</dt>")
            .before($("<dd></dd>").html(data[k].role))
            .before("<dt>Allowed <a href='#state-and-property-attributes'>ARIA State and Property Attributes</a>:</dt>")
            .before($("<dd></dd>").html(data[k].attr))
        ;
    }
    window.info("Injected all ARIA information into elements. Thanks Steve!");
};
exports.params = function () {
    return [JSON.parse(rfs("res/steve-data.json"))];
};
