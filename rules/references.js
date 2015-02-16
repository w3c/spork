
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
