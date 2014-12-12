
exports.name = "strip-script";
exports.landscape = ""; // does nothing at that level
exports.transform = function (doc, env, done) {
    env.logger.info("Stripping scripts");
    // remove scripts
    doc.querySelectorAll("script")
        .forEach(function (el) { el.remove(); })
    ;
    // remove on*
    done();
};
