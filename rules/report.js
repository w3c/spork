
exports.name = "report";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    window.info("Sending source to be saved.");
    window.saveSource("<!DOCTYPE html>\n" + document.documentElement.outerHTML);
};
