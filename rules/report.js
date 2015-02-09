/* globals info, saveSource */

exports.name = "report";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    info("Sending source to be saved.");
    saveSource("<!DOCTYPE html>\n" + document.documentElement.outerHTML);
};
