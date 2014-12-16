
exports.name = "report";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    window.callPhantom({ info: "Sending source to be saved." });
    window.callPhantom({ source: "<!DOCTYPE html>\n" + document.documentElement.outerHTML });
    return {};
};
