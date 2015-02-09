
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
    require("../rules/load-jquery")
,   require("../rules/strip-script")
,   require("../rules/outlinify")
,   require("../rules/drop-sections")
,   require("../rules/boilerplate")
,   require("../rules/toc")
,   require("../rules/dependencies")
,   require("../rules/report") // send the source
];
