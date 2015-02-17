

exports.name = "fork-link-types";
exports.landscape = "W3C HTML has no link types: sidebar, external, pingback.";
exports.transform = function () {
    // drop sections: link-type-{sidebar,external,pingback}
    $("#link-type-sidebar").remove();
    $("#link-type-external").remove();
    $("#link-type-pingback").remove();

    // drop § about "sidebar" in #following-hyperlinks
    $("#following-hyperlinks").parent().find("p:contains('sidebar')").remove();
    
    // table row for each in #linkTypes
    var $tab = $("#linkTypes").parent().find("table:first");
    $tab.find("tr:contains('external'):first").remove();
    $tab.find("tr:contains('pingback'):first").remove();
    $tab.find("tr:contains('sidebar'):first").remove();

    // drop p.note in #secondary-browsing-contexts
    $("#secondary-browsing-contexts").parent().find("p.note:first").remove();
};
