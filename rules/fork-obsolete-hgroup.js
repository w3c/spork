
var rfs = require("../lib/rfs");

exports.name = "fork-obsolete-hgroup";
exports.landscape = "In W3C HTML, the hgroup element is obsolete.";
exports.transform = function (data) {
    // drop section #the-hgroup-element
    $("#the-hgroup-element").parent().remove();
    
    // example with hgroup in #semantics-2, #the-section-element x2, #the-footer-element, 
    //      #sample-outlines, #the-iframe-element, #the-main-part-of-the-content
    $("#semantics-2").parent().find("div.example:eq(1)").remove();
    $("#the-section-element").parent().find("div.example:first, div.example:eq(2)").remove();
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
        $(this).html($(this).html().replace(/\s+element\s+that[\s\S]*?ancestor\s*/, ""));
    });

    // content model of #the-h1,-h2,-h3,-h4,-h5,-and-h6-elements
    $("#the-h1\\,-h2\\,-h3\\,-h4\\,-h5\\,-and-h6-elements")
        .parent()
        .find("dl.element dd:contains('hgroup')")
        .remove()
    ;

    // note, example in #the-header-element
    $("#the-header-element").parent().find("p.note:first, div.example:first").remove();

    // sentence in #headings-and-sections
    var $hsp = $("#headings-and-sections").parent().find("p:first");
    $hsp.html($hsp.html().replace(/\s+and\s+the[\s\S]*?element\s+/, " "));

    // table under #usage-summary-2
    $("#usage-summary-2").parent().find("table tr:contains('hgroup')").remove();

    // sentence in #the-strong-element
    var $tse = $("#the-strong-element").parent().find("p:contains('hgroup')");
    $tse.html($tse.html().replace(/\(This\s+is\s+distinct[\s\S]*?\)/, ""));

    // sentence in #the-small-element
    var $tsm = $("#the-small-element").parent().find("p:contains('hgroup')");
    $tsm.html($tsm.html().replace(/;\s+for\s+that\s+purpose[\s\S]*?\./, "."));

    // remove mention in table #elements-3, as well as dedicated row
    var $e3 = $("#elements-3").parent().find("table:first td:contains('hgroup'):first");
    $e3.html($e3.html().replace(/^[\s\S]*;\s*/, ""));
    $("#elements-3").parent().find("table:first th:contains('hgroup')").parent().remove();

    // mentions in #element-content-categories
    $("#element-content-categories")
        .parent()
        .find("table td:contains('hgroup')")
        .each(function () {
            $(this).html($(this).html().replace(/;\s+[\s\S]*?hgroup[\s\S]*?code>/, ""));
        })
    ;

    // row in #element-interfaces
    $("#element-interfaces").parent().find("table td:nth-of-type(1):contains('hgroup')").parent().remove();

    // add listing under #non-conforming-features
    var $dti = $("#non-conforming-features").parent().find("dl > dt:contains('isindex')");
    $dti.before(data.dt);
    $dti.before(data.dd);

    // add § at the end of other-elements,-attributes-and-apis
    $("#other-elements\\,-attributes-and-apis").parent().append(data.semantics);
    
    // drop the SVG Venn diagram (plus mention of it)
    var $venn = $("object[data$='content-venn.svg'], img[src$='content-venn.svg']");
    $venn.prev("p").remove();
    $venn.remove();
};
exports.params = function () {
    return [{
        dt:         rfs("res/the-hgroup-element/dt.html")
    ,   dd:         rfs("res/the-hgroup-element/dd.html")
    ,   semantics:  rfs("res/the-hgroup-element/semantics.html")
    }];
};
