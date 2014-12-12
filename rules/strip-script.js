
exports.name = "strip-script";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    $("script").remove();
    window.callPhantom({ info: "removed all script elements" });

    // remove on*
    $("*").each(function () {
        var attrs = this.attributes;
        for (var i = 0, n = attrs.length; i < n; i++) {
            if (!attrs[i]) continue;
            var att = attrs[i].name.toLowerCase();
            if (att.indexOf("on") === 0) this.removeAttribute(att);
        }
    });
    window.callPhantom({ info: "removed all on* attributes" });
    return {};
};
