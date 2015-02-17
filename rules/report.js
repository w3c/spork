
exports.name = "report";
exports.landscape = null;
exports.transform = function () {
    window.info("Sending source to be saved.");
    window.saveSource("<!DOCTYPE html>\n" + document.documentElement.outerHTML);
};
