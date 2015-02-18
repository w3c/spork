
exports.name = "fork-longdesc";
exports.landscape = "W3C HTML does not consider @longdesc to be obsolete.";
exports.transform = function () {
    // remove from obsolete
    var $ldDT = $("#attr-img-longdesc").parent()
    ,   $dd = $ldDT.next("dd")
    ;
    $dd.html($dd.html().replace(/,[\s\S]+\./, "."));
    $ldDT.remove();
};
