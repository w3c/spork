
var rfs = require("../lib/rfs");

exports.name = "fork-table-border";
exports.landscape = "table@border only obsolete in WHATWG HTML.";
exports.transform = function (data) {
    var $dl = $("#the-table-element").parent().find("dl.element:first");

    // add attribute under the-table-element
    $dl.find("dt:contains('Content attributes')")
        .next("dd")
        .after('<dd><code><a href="#attr-table-border">border</a></code></dd>')
    ;
    
    // add it to IDL
    var $pre = $dl.find("pre.idl");
    $pre.html($pre.html().replace(/};/, '           attribute DOMString <a href="#dom-table-border-0">border</a>;\n'));
    
    // § "the border attribute" with dfn
    $dl.nextAll("p.note:eq(1)").after(data.note);
    
    // the table right underneath, drop "non-conforming" x2
    var $table = $("#the-table-element").parent().find("table:first");
    $table.find("td:contains('non-conforming border')")
            .each(function () {
                $(this).html($(this).html().replace(/non-conforming/, ""));
            })
    ;
    
    // add § at the end of #non-conforming-features
    $("#non-conforming-features").parent().append(data.nonconforming);

    // border table in obsolete section
    $("#attr-table-border").parent().remove();

    // drop from IDL and description in #requirements-for-implementations
    var $idl = $("#HTMLTableElement-partial").parent();
    $idl.html($idl.html().replace(/\s+attribute\s+DOMString\s+[\s\S]+?border[\s\S]+?;\s+/, ""));
    
    // #elements-3 add to table line in table
    $("#elements-3")
        .parent()
        .find("table:first th:contains('table')")
        .parent()
        .find("td:eq(4)")
        .append(document.createTextNode("; "))
        .append('<code><a href="#attr-table-border">border</a></code>')
    ;
};
exports.params = function () {
    return [{
        note:           rfs("res/the-table-element/note.html")
    ,   nonconforming:  rfs("res/the-table-element/nonconforming.html")
    }];
};
