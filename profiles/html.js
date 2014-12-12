
// Mainline HTML
exports.name = "HTML";
exports.url = "https://html.spec.whatwg.org/";

exports.rules = [
    require("../rules/load-jquery")
,   require("../rules/strip-script")
];
