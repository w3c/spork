/* globals URI */

exports.name = "dependencies";
exports.landscape = null;
exports.transform = function () {
    window.unplugResources();
    $("img[src], iframe[src], object[data]").each(function () {
        var field = this.localName.toLowerCase() === "object" ? "data" : "src";
        if (this[field]) {
            var url = new URI(this[field]);
            // DRY issue: this is more or less repeated from html.js
            if (url.protocol() === "data") return;
            if (url.hostname() === "resources.whatwg.org") return;
            if (url.hostname() === "code.jquery.com") return;
            if (url.hostname() === "html.spec.whatwg.org") {
                window.info("Mapping " + this[field] + " to " + url.pathname());
                this[field] = url.pathname(); // this just ensures that things stay relative
            }
            if (url.hostname() === "images.whatwg.org") {
                window.info("Mapping " + this[field] + " to img" + url.pathname());
                this[field] = "img" + url.pathname();
            }
            if (url.hostname() === "whatwg.org" && /^\/demos/i.test(url.pathname())) {
                window.info("Mapping " + this[field] + " to " + url.pathname());
                this[field] = url.pathname();
            }
        }
    });
    window.info("done remapping dependencies");
};
