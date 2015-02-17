
exports.name = "id";
exports.landscape = "";
exports.transform = function () {
    // check for stray IDs
    var seen = {}
    ,   escSel = function (sel) {
            return sel.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g,'\\$1');
        }
    ;
    $("a[href^='#']")
        .each(function () {
            var id = $(this).attr("href");
            if (seen[id]) return;
            seen[id] = true;
            if (!$("#" + escSel(id.replace("#", ""))).length) window.warn("Dangling ID reference:" + id);
        })
    ;
    
    // XXX
    // remap IDs where it makes sense
    // do that by indexing the stuff we drop before dropping it
    
    window.info("FORK: " + exports.landscape);
};
