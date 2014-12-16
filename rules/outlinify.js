/* global HTMLOutline */

exports.name = "outlinify";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    window.callPhantom({ info: "removing some useless elements" });
    $("#configUI, #head").remove();
    window.callPhantom({ info: "running outliner" });
    HTMLOutline(document.body);
    window.callPhantom({ info: "outliner done" });
    // window.callPhantom({ info: "OUTLINE LIST\n" + JSON.stringify(document.body.sectionList, function (k, v) {
    //     if (k === "heading") return v ? v.textContent : v;
    //     if (k === "parentSection" || k === "heading" || k === "associatedNodes") return undefined;
    //     return v;
    // }, 4) });

    var wrap = function (sections) {
        for (var i = 0, n = sections.length; i < n; i++) {
            var s = sections[i]
            ,   contents = s.associatedNodes
            ;
            // window.callPhantom({ info: "handling section " + (s.heading ? s.heading.textContent : "null") + " with contents " + contents.length + " ZERO=" + contents[0].toString() });
            // the order in which HTMLOutline returns the contents is weird, so we skip this check for now
            // if (contents[0] && contents[0].localName.toLowerCase() === "section") contents.shift();
            window.callPhantom({ info: "wrapping section..." });
            $(contents).wrapAll("<section></section>");
            window.callPhantom({ info: "...section wrapped" });
            if (s.childSections.length) wrap(s.childSections);
        }
    };
    wrap(document.body.sectionList);

    // XXX
    //  - other exceptions to not wrap sectioning element than <section>?
    //  - maybe check that the heading isn't implied (warn?)
    //  - maybe check that we're not in a table, details, etc.

    window.callPhantom({ info: "outline built using <section> elements" });
    return {};
};
