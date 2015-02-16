
exports.name = "fork-nav-list";
exports.landscape = "W3C HTML suggests using lists in nav elements.";
exports.transform = function () {
    $("#the-nav-element")
        .parent()
        .find("p:first")
        .after('<p class="note">In cases where the content of a <code><a href="#the-nav-element">nav</a></code> ' +
            'element represents a list of items, use list markup to aid understanding and navigation.</p>')
    ;
    
    window.info("FORK: " + exports.landscape);
};
