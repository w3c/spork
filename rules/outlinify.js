
exports.name = "outlinify";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    window.callPhantom({ info: "removing some useless elements" });
    $("#configUI, #head, div.status, #reviewer, div[itemtype='http://n.whatwg.org/work']").remove();
    
    // note that this is not the HTML outline algorithm but something a lot simpler
    window.callPhantom({ info: "running outliner" });
    // find all h*
    var headings = $("h2, h3, h4, h5, h6")
                        .get()
                        .map(function (el) {
                            return {
                                rank:   0 + el.localName.replace(/h/i, "")
                            ,   el:     el
                            };
                        })
    ;
    // going from h6 down to h2
    [6, 5, 4, 3, 2].forEach(function (rank) {
        // for each one in the list, find the next item that is either same rank, or lower rank, or EODOC
        // pick the previousSibling of that next item
        for (var i = 0, n = headings.length; i < n; i++) {
            var h = headings[i];
            if (h.rank !== rank) continue;
            var endPoint = null;
            for (var j = i + 1, m = headings.length; j < m; j++) {
                var next = headings[j];
                if (next.rank <= rank) {
                    endPoint = next.el.previousElementSibling;
                    break;
                }
            }
            // we hit the end of the body without finding anything
            if (endPoint === null) endPoint = document.body.lastElementChild;
            // create a Range from the h* to the previousSibling and wrap it
            var range = document.createRange();
            range.setStartBefore(h.el);
            range.setEndAfter(endPoint);
            range.surroundContents(document.createElement("section"));
        }
    });

    window.callPhantom({ info: "outline built using <section> elements" });
    return {};
};
