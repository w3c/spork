
exports.name = "fork-table-layout";
exports.landscape = "W3C HTML considers that table layout SHOULD NOT be used (instead of MUST NOT).";
exports.transform = function () {
    var $p = $("#the-table-element")
                .parent()
                .find("p:contains('layout aids')")
    ;
    $p.html($p.html().replace(/must\s+not/, "should not"));
    
    window.info("FORK: " + exports.landscape);
};
