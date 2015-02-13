
exports.name = "fork-obsolete-hgroup";
exports.landscape = "In W3C HTML, the hgroup element is obsolete.";
exports.transform = function () {
    // drop section #the-hgroup-element
    $("#the-hgroup-element").remove();
    
    // example with hgroup in #semantics-2, #the-section-element x2, #the-footer-element, 
    //      #sample-outlines, #the-iframe-element, #the-main-part-of-the-content
    $("#semantics-2").parent().find("div.example:eq(1)").remove();
    $("#the-section-element").parent().find("div.example:eq(1), div.example:eq(3)").remove();
    $("#the-footer-element").parent().find("div.example:eq(0)").remove();
    $("#sample-outlines").parent().find("div.example:last").remove();
    $("#the-iframe-element").parent().find("div.example:contains('hgroup')").remove();
    $("#the-main-part-of-the-content").parent().find("div.example:eq(2)").remove();

    // drop from list under #flow-content, #heading-content, #palpable-content
    $("#flow-content, #heading-content, #palpable-content").each(function () {
        $(this).parent().find("ul li:contains('hgroup')").remove();
    });

    // drop from table in #wai-aria, as well as "that does not have an hgroup ancestor" sentences 
    // (but not lines) in second table
    $("#table-aria-strong tr:contains('hgroup')").remove();
    $("#table-aria-weak td:contains('hgroup ancestor')").each(function () {
        $(this).html($(this).html().replace(/\s+element\s+that.*?ancestor\s*/, ""));
    });

    // content model of #the-h1,-h2,-h3,-h4,-h5,-and-h6-elements
    $("#the-h1\\,-h2\\,-h3\\,-h4\\,-h5\\,-and-h6-elements")
        .parent()
        .find("dl.element dd:contains('group')")
        .remove()
    ;

    // note, example in #the-header-element
    $("#the-header-element").parent().find("p.note:first, div.example:first").remove();

    // sentence in #headings-and-sections
    var $hsp = $("#headings-and-sections").parent().find("p:first");
    $hsp.html($hsp.html().replace(/\s+and\s+the.*?element\s+/, ""));

    // table under #usage-summary-2
    $("#usage-summary-2").parent().find("table tr:contains('hgroup')").remove();

    // sentence in #the-strong-element
    var $tse = $("#the-strong-element").parent().find("p:contains('hgroup')");
    $tse.html($tse.html().replace(/\(This\s+is\s+distinct.*?\)/, ""));

    // sentence in #the-small-element
    var $tsm = $("#the-small-element").parent().find("p:contains('hgroup')");
    $tsm.html($tsm.html().replace(/;\s+for\s+that\s+purpose.*?\./, ""));

    // remove mention in table #elements-3, as well as dedicated row
    var $e3 = $("#elements-3").parent().find("table:first td:contains('hgroup'):first");
    $e3.html($e3.html().replace(/^.*;\s*/, ""));
    $("#elements-3").parent().find("table:first th:contains('hgroup')").parent().remove();

    // mentions in #element-content-categories
    $("#element-content-categories")
        .parent()
        .find("table td:contains('hgroup')")
        .each(function () {
            $(this).html($(this).html().replace(/;\s+.*?hgroup.*?code>/, ""));
        })
    ;

    // row in #element-interfaces
    $("#element-interfaces").parent().find("table td:nth-of-type(1):contains('hgroup')").parent().remove();

    // add listing under #non-conforming-features
    var $dti = $("#non-conforming-features").parent().find("dl > dt:contains('isindex')");
    $dti.before('<dt><dfn id="hgroup"><code>hgroup</code></dfn></dt>');
    $dti.before('<dd><p>To mark up subheadings, consider putting the subheading into a ' +
                '<code><a href="#the-p-element">p</a></code> element after the ' +
                '<code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h1</a></code>-' +
                '<code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h6</a></code> element ' +
                'containing the main heading, or putting the subheading directly within the ' +
                '<code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h1</a></code>-' +
                '<code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h6</a></code> element ' +
                'containing the main heading, but separated from the main heading by punctuation ' +
                'and/or within, for example, a <code>span class="subheading"</code> element with ' +
                'differentiated styling.</p><p>Headings and subheadings, alternative titles, or ' +
                'taglines can be grouped using the <code><a href="#the-header-element">header</a></code> ' +
                'or <code><a href="#the-div-element">div</a></code> elements.</p></dd>')
    ;

    // add § at the end of other-elements,-attributes-and-apis
    $("#other-elements\\,-attributes-and-apis")
        .parent()
        .append('<p>The <code><a href="#hgroup" style="">hgroup</a></code> element does not have ' +
                '<a href="#strong-native-semantics">strong native semantics</a> or ' +
                '<a href="#default-implicit-aria-semantics">default implicit ARIA semantics</a>. ' +
                'User agents must not implement accessibility layer semantics for the <code><a ' +
                'href="#hgroup" style="">hgroup</a></code> element that obfuscates or modifies the ' +
                'semantics of its children.</p>')
    ;
    
    // drop the SVG Venn diagram (plus mention of it)
    var $venn = $("object[data$='content-venn.svg']");
    $venn.prev("p").remove();
    $venn.remove();
    
    window.info("FORK: " + exports.landscape);
};