
exports.name = "drop-sections";
exports.landscape = "The sections 'The 2D rendering context', 'Web workers', 'Web storage', " +
                    "'Communication', and 'Microdata' are not present in W3C HTML.";
exports.transform = function () {
    $("#2dcontext, #workers, #webstorage, #comms, #microdata").parent("section").remove();
    window.callPhantom({ info: "Removed sections not supported in this specification" });
    return {};
};
