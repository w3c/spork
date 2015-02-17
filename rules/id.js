
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


// warn: Dangling ID reference:#names:-the-itemprop-attribute
//  - need to drop all mentions of itemprop

// warn: Dangling ID reference:#comms
//  - drop parts of #structure-of-this-specification

// warn: Dangling ID reference:#xhtml
//  - problem with dfn@id in hN

// warn: Dangling ID reference:#refsTIMEZONES
// warn: Dangling ID reference:#local-date-and-time-state-(type=datetime-local)
// warn: Dangling ID reference:#sectioning-content-0
// warn: Dangling ID reference:#the-body-element-0
// warn: Dangling ID reference:#the-hgroup-element
// warn: Dangling ID reference:#flow-content-1
// warn: Dangling ID reference:#palpable-content-0
// warn: Dangling ID reference:#allowed-aria-roles,-states-and-properties
// warn: Dangling ID reference:#phrasing-content-1
// warn: Dangling ID reference:#refsRUBY-UC
// warn: Dangling ID reference:#the-rb-element
// warn: Dangling ID reference:#the-rtc-element
// warn: Dangling ID reference:#process-an-rtc-element
// warn: Dangling ID reference:#hyperlink-auditing
// warn: Dangling ID reference:#webvtt
// warn: Dangling ID reference:#refsINBANDTRACKS
// warn: Dangling ID reference:#text-track-cue-data
// warn: Dangling ID reference:#dom-table-border-0
// warn: Dangling ID reference:#text/ping
// warn: Dangling ID reference:#attr-iframe-longdesc
// warn: Dangling ID reference:#attr-img-longdesc
// warn: Dangling ID reference:#rb
// warn: Dangling ID reference:#broadcastchannel
