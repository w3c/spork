
exports.name = "id";
exports.landscape = null;
exports.transform = function () {
    // check for stray IDs after having remapped known ones
    var seen = {};
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
            if (!$("#" + window.escSel(id.replace("#", ""))).length) window.warn("Dangling ID reference:" + id);
        })
    ;
};

// JUST ARIA
// this is in ARIA:
// warn: Dangling ID reference:#local-date-and-time-state-(type=datetime-local)

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
// warn: Dangling ID reference:#index-aria-heading
// warn: Dangling ID reference:#index-aria-tab
// warn: Dangling ID reference:#index-aria-banner
// warn: Dangling ID reference:#allowed-aria-roles,-states-and-properties
// warn: Dangling ID reference:#index-aria-separator
// warn: Dangling ID reference:#index-aria-list
// warn: Dangling ID reference:#index-aria-directory
// warn: Dangling ID reference:#index-aria-group
// warn: Dangling ID reference:#index-aria-listbox
// warn: Dangling ID reference:#index-aria-menu
// warn: Dangling ID reference:#index-aria-menubar
// warn: Dangling ID reference:#index-aria-radiogroup
// warn: Dangling ID reference:#index-aria-tablist
// warn: Dangling ID reference:#index-aria-toolbar
// warn: Dangling ID reference:#index-aria-tree
// warn: Dangling ID reference:#index-aria-listitem
// warn: Dangling ID reference:#index-aria-menuitem
// warn: Dangling ID reference:#index-aria-menuitemcheckbox
// warn: Dangling ID reference:#index-aria-menuitemradio
// warn: Dangling ID reference:#index-aria-option
// warn: Dangling ID reference:#index-aria-radio
// warn: Dangling ID reference:#index-aria-treeitem
// warn: Dangling ID reference:#index-aria-button
// warn: Dangling ID reference:#index-aria-checkbox
// warn: Dangling ID reference:#index-aria-img
// warn: Dangling ID reference:#index-aria-textbox
// warn: Dangling ID reference:#index-aria-progressbar
// warn: Dangling ID reference:#index-aria-tabpanel

