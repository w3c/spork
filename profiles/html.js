
// Mainline HTML
exports.name = "HTML";
// exports.url = "https://html.spec.whatwg.org/";
exports.url = "http://multifarious.dev/empty-html/"; // local emptied version for optimal dev

exports.rules = [
    // require("../rules/hide") // display none everything to see if we gain speed with reflows
   require("../rules/load-jquery")
,   require("../rules/strip-script")
,   require("../rules/outlinify")
// ,   require("../rules/show") // revert the hide
];
