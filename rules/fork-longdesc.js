
exports.name = "fork-longdesc";
exports.landscape = "W3C HTML does not consider @longdesc to be obsolete.";
exports.transform = function () {
    // remove from obsolete
    $("#attr-iframe-longdesc").parent().remove();
    var $ldDT = $("#attr-img-longdesc").parent();
    $ldDT.next("dd").remove();
    $ldDT.remove();
};
