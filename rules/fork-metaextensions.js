/*global assert*/

exports.name = "fork-metaextensions";
exports.landscape = "Looser MetaExtensions and microformats wikis requirements in W3C HTML.";
exports.transform = function () {
    assert("Other metadata names or link types",
    $("#other-metadata-names, #other-link-types"), 2).each(function () {
        var $p = assert("Conformance checkers", $(this).parent().find("p:contains('Conformance checkers must use')"));
        $p.text($p.text().replace(/must/, "may"));
    });
};
