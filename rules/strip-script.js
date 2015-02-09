
exports.name = "strip-script";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    $("script, link[rel='stylesheet'], link[rel='icon'], #alert").remove();
    window.info("removed all script and style elements");

    // remove on*
    $("*").each(function () {
        var attrs = this.attributes;
        for (var i = 0, n = attrs.length; i < n; i++) {
            if (!attrs[i]) continue;
            var att = attrs[i].name.toLowerCase();
            if (att.indexOf("on") === 0) this.removeAttribute(att);
        }
    });
    window.info("removed all on* attributes");
};
