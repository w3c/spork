
exports.name = "fork-datetime-local";
exports.landscape = "W3C HTML has dropped <input type=datetime-local>.";
exports.transform = function () {
    // drop section #local-date-and-time-state-(type=datetime-local)
    $("#local-date-and-time-state-\\(type\\=datetime-local\\)").parent().remove();

    // drop row in table #the-input-element
    $("#the-input-element")
        .parent()
        .find("table:first td:contains('datetime-local')")
        .parent()
        .remove()
    ;
    
    // section #date-and-time-state-(type=datetime) has an example with two § to drop
    $("#date-and-time-state-\\(type\\=datetime\\)")
        .parent()
        .find("div.example p:contains('datetime-local')")
        .remove()
    ;
    
    // #the-input-element-as-domain-specific-widgets drop from style and § below
    var $css = $("#the-input-element-as-domain-specific-widgets")
                    .parent()
                    .find("pre.css:first")
    ;
    $css.html($css.html().replace(/\s+input\[type=datetime-local[\s\S]*?}/));
    $("#the-input-element-as-domain-specific-widgets")
        .parent()
        .find("p:contains('input-datetime-local')")
        .remove()
    ;
    
    // #input-type-attr-summary needs a column excised
    $("#input-type-attr-summary")
        .find("thead:first th:eq(7)").remove().end()
        .find("tbody tr")
        .each(function () {
            $(this).find("td:eq(6)").remove();
        })
    ;
    
    // #implicit-submission:local-date-and-time-state-(type=datetime-local)
    var $mention = $("#implicit-submission\\:local-date-and-time-state-\\(type\\=datetime-local\\)")
    ,   $parent = $mention.parent()
    ;
    $mention.remove();
    $parent.html($parent.html().replace(/,\s*,/, ", "));
};
