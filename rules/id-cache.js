
exports.name = "id-cache";
exports.landscape = null;
exports.transform = function () {
    window.idCache = {};
    window.cacheID = function ($el, url) {
        $el.each(function () {
            // window.info("### PROCESSING: " + $(this).attr("id"));
            $(this)
                .find("[id]")
                .each(function () {
                    var id = "#" + $(this).attr("id");
                    if (/:/.test(id)) return;
                    window.idCache[id] = url + id;
                });
        });
    };
};
