
// Mainline HTML
exports.name = "HTML";
// exports.url = "https://html.spec.whatwg.org/";
exports.url = "http://multifarious.dev/empty-html/"; // local emptied version for optimal dev

exports.rules = [
    require("../rules/load-jquery")
,   require("../rules/strip-script")
,   require("../rules/outlinify")
,   require("../rules/drop-sections")
,   require("../rules/boilerplate")
,   require("../rules/toc")
,   require("../rules/report") // send the source
];
