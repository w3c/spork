
exports.name = "fork-table-border";
exports.landscape = "table@border only obsolete in WHATWG HTML.";
exports.transform = function () {
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
    $dl.nextAll("p.note:eq(1)")
        .after(
            '<p>The <dfn id="attr-table-border"><code>border</code></dfn> attribute may be specified on a ' +
            '<code><a href="#the-table-element">table</a></code> element to explicitly indicate that the ' +
            '<code><a href="#the-table-element">table</a></code> element is not being used for layout ' +
            'purposes. If specified, the attribute\'s value must either be the empty string or the value ' +
            '"<code>1</code>". The attribute is used by certain user agents as an indication that borders ' +
            'should be drawn around cells of the table.</p>'
        )
    ;
    
    // the table right underneath, drop "non-conforming" x2
    var $table = $("#the-table-element").parent().find("table:first");
    $table.find("td:contains('non-conforming border')")
            .each(function () {
                $(this).html($(this).html().replace(/non-conforming/, ""));
            })
    ;
    
    // add § at the end of #non-conforming-features
    $("#non-conforming-features")
        .parent()
        .append(
            '<p class="auth">The <code><a href="#attr-table-border">border</a></code> attribute on ' +
            'the <code><a href="#the-table-element">table</a></code> element can be used to provide ' +
            'basic fallback styling for the purpose of making tables legible in browsing environments ' +
            'where CSS support is limited or absent, such as text-based browsers, WYSIWYG editors, ' +
            'and in situations where CSS support is disabled or the style sheet is lost. Only the ' +
            'empty string and the value "<code>1</code>" may be used as <code><a ' +
            'href="#attr-table-border" style="">border</a></code> values for this purpose. Other ' +
            'values are considered obsolete. To regulate the thickness of such borders, authors ' +
            'should instead use CSS.</p>'
        )
    ;

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

    window.info("FORK: " + exports.landscape);
};
