
exports.name = "outlinify";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    // XXX
    //  - inject vendor/HTMLOutliner using phantom
    //  - give it the body (or something deeper to avoid the boilerplate?)
    //  - once done, look at body.associatedSection
    //  - walk the .sectionList of that, wrapAll()ing each *unless* for that section the 
    //    .associatedNodes[0] is a sectioning element
    //  - recurse
    //  - maybe check that the heading isn't implied (warn?)
    //  - maybe check that we're not in a table, details, etc.

    window.callPhantom({ info: "outline built using <section> elements" });
    return {};
};
