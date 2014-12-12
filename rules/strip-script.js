
exports.name = "strip-script";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    $("script").remove();

    // remove on*
    // XXX

    return {};
};
