
exports.name = "hide";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    document.body.style.display = "none";
    return {};
};
