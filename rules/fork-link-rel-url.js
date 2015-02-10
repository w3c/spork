
exports.name = "fork-link-rel-url";
exports.landscape = "URL allowed in link@rel in W3C HTML (https://github.com/w3c/html/commit/954203e085e601122a2df38207bfdd6d852a0963).";
exports.transform = function () {
    $("#extensibility ~ ul")
            .first()
            .find("li:contains('This is also used by microformats')")
            .append(document.createTextNode(" Additionally, absolute URLs that do not contain any " +
                                            "non-ASCII characters, nor characters in the range U+0041" +
                                            " (LATIN CAPITAL LETTER A) through U+005A (LATIN CAPITAL " +
                                            "LETTER Z) (inclusive), may be used as link types."))
    ;
    var $p = $("#other-link-types ~ p:contains('\"Effect on...\" field, whereas values')");
    $p.html($p.html().replace(/"Effect\s+on\.\.\."\sfield.*?Conformance\s+checkers\s+may\s+cache\s+this/
                            , "\"Effect on...\" field, whereas values marked as \"discontinued\" " +
                              "or values not containing a U+003A COLON character but not listed in " +
                              "either this specification or on the aforementioned page must be " +
                              "rejected as invalid. The remaining values must be accepted as valid " +
                              "if they are absolute URLs containing US-ASCII characters only and " +
                              "rejected otherwise. Conformance checkers may cache this"));
    $p.after("<p class='note'>Note: Even URL-valued link types are compared ASCII-case-insensitively." +
             " Validators might choose to warn about characters U+0041 (LATIN CAPITAL LETTER A) through " +
             "U+005A (LATIN CAPITAL LETTER Z) (inclusive) in the pre-case-folded form of link types that " +
             "contain a colon.</p>");
    window.info("FORK: " + exports.landscape);
};
