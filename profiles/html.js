
var u = require("url");

// Mainline HTML
exports.name = "HTML";
exports.url = "https://html.spec.whatwg.org/";
// exports.url = "http://multifarious.dev/empty-html/"; // local emptied version for optimal dev

exports.configuration = {
    boilerplate:    "res/html-ed.html"
,   style:          "res/html.css"
,   title:          "HTML 5.1 Nightly"
,   downloads:      {}
};

var seen = {};
exports.resources = function (res) {
    var url = u.parse(res.url)
    ,   dl = exports.configuration.downloads
    ;
    if (seen[url.href]) return;
    seen[url.href] = true;
    if (url.protocol === "data:") return;
    if (url.hostname === "resources.whatwg.org") return;
    if (url.hostname === "code.jquery.com") return;
    if (url.hostname === "html.spec.whatwg.org") {
        if (url.pathname === "/") return;
        if (/\.js/i.test(url.pathname)) return;
        dl[url.href] = url.pathname;
    }
    if (url.hostname === "images.whatwg.org") {
        dl[url.href] = "/img" + url.pathname;
    }
    if (url.hostname === "whatwg.org" && /^\/demos/i.test(url.pathname)) {
        dl[url.href] = url.pathname;
    }
};

exports.rules = [
    require("../rules/strip-script")
,   require("../rules/outlinify")
,   require("../rules/drop-sections")
,   require("../rules/boilerplate")
,   require("../rules/toc")
,   require("../rules/aria-steve")
,   require("../rules/fork-link-rel-url")
,   require("../rules/fork-no-ping")
,   require("../rules/fork-obsolete-hgroup")
,   require("../rules/fork-metaextensions")
,   require("../rules/fork-ruby")
,   require("../rules/fork-longdesc")
,   require("../rules/fork-table-layout")
,   require("../rules/fork-table-border")
,   require("../rules/fork-main-element")
,   require("../rules/fork-nav-list")
,   require("../rules/fork-section-headings")
,   require("../rules/fork-blockquote-cite")
,   require("../rules/fork-alt")
,   require("../rules/fork-datacue")
,   require("../rules/fork-link-types")
,   require("../rules/fork-links-in-labels")
,   require("../rules/fork-pattern-title")
,   require("../rules/fork-placeholder-label")
,   require("../rules/fork-focus-ring-css")
,   require("../rules/fork-input-bidi-plaintext")
,   require("../rules/fork-license-main")
,   require("../rules/fork-tz-warning")
,   require("../rules/references")
,   require("../rules/dependencies")
,   require("../rules/report") // send the source
];
