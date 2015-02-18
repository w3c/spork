
exports.name = "id";
exports.landscape = null;
exports.transform = function () {
    // check for stray IDs after having remapped known ones
    var seen = {}
    ,   escSel = function (sel) {
            return sel.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g,'\\$1');
        }
    ;
    $("a[href^='#']")
        .each(function () {
            var $a = $(this)
            ,   id = $a.attr("href");
            if (window.idCache[id]) {
                $a.attr("href", window.idCache[id]);
                return;
            }
            if (seen[id]) return;
            seen[id] = true;
            if (!$("#" + escSel(id.replace("#", ""))).length) window.warn("Dangling ID reference:" + id);
        })
    ;
};

// JUST ARIA
// warn: Dangling ID reference:#aria-role-attribute
// warn: Dangling ID reference:#state-and-property-attributes
// warn: Dangling ID reference:#index-aria-global
// warn: Dangling ID reference:#index-aria-link
// warn: Dangling ID reference:#aria-usage-note
// warn: Dangling ID reference:#index-aria-document
// warn: Dangling ID reference:#index-aria-application
// warn: Dangling ID reference:#index-aria-article
// warn: Dangling ID reference:#index-aria-main
// warn: Dangling ID reference:#index-aria-region
// warn: Dangling ID reference:#index-aria-alert
// warn: Dangling ID reference:#index-aria-alertdialog
// warn: Dangling ID reference:#index-aria-contentinfo
// warn: Dangling ID reference:#index-aria-dialog
// warn: Dangling ID reference:#index-aria-log
// warn: Dangling ID reference:#index-aria-marquee
// warn: Dangling ID reference:#index-aria-presentation
// warn: Dangling ID reference:#index-aria-search
// warn: Dangling ID reference:#index-aria-status
// warn: Dangling ID reference:#index-aria-navigation
// warn: Dangling ID reference:#index-aria-complementary
// warn: Dangling ID reference:#index-aria-note
// warn: Dangling ID reference:#allowed-aria-roles,-states-and-properties
// this is in ARIA:
// warn: Dangling ID reference:#local-date-and-time-state-(type=datetime-local)
