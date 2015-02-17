
exports.name = "fork-metaextensions";
exports.landscape = "Looser MetaExtensions and microformats wikis requirements in W3C HTML.";
exports.transform = function () {
    $("#other-metadata-names, #other-link-types").each(function () {
        var $p = $(this).parent().find("p:contains('Conformance checkers must use')");
        $p.text($p.text().replace(/must/, "may"));
    });
};
