
var rfs = require("../lib/rfs");

exports.name = "fork-link-rel-url";
exports.landscape = "URL allowed in link@rel in W3C HTML (https://github.com/w3c/html/commit/954203e085e601122a2df38207bfdd6d852a0963).";
exports.transform = function (data) {
    $("#extensibility ~ ul")
            .first()
            .find("li:contains('This is also used by microformats')")
            .append(document.createTextNode(data.extensibility))
    ;
    var $p = $("#other-link-types ~ p:contains('\"Effect on...\" field, whereas values')");
    $p.html($p.html().replace(/"Effect\s+on\.\.\."\sfield[\s\S]*?Conformance\s+checkers\s+may\s+cache\s+this/
                            , data.effect));
    $p.after(data.note);
};
exports.params = function () {
    return [{
        extensibility:  rfs("res/link-rel-url/extensibility.txt")
    ,   effect:         rfs("res/link-rel-url/effect.txt")
    ,   note:           rfs("res/link-rel-url/note.html")
    }];
};
