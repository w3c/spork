
exports.name = "fork-section-headings";
exports.landscape = "W3C HTML has a SHOULD on using headings for sections.";
exports.transform = function () {
    var $p = $("#the-section-element").parent().find("p:first");
    $p.html(
        $p.html()
            .replace(/,\s+typically\s+with\s+a\s+heading./
                    , '. Each <code><a href="#the-section-element">section</a></code> should' +
                    ' be identified, typically by including a heading (' +
                    '<code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h1</a></code>-' +
                    '<code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h6</a></code> ' +
                    'element) as a child of the <code><a href="#the-section-element">section</a></code> element.'))
    ;

    $("#the-h1\\,-h2\\,-h3\\,-h4\\,-h5\\,-and-h6-elements")
        .parent()
        .find("div.example")
        .before(
            '<p><code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h1</a></code>&ndash;<code>' +
            '<a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h6</a></code> elements must not be ' +
            'used to markup subheadings, subtitles, alternative titles and taglines unless intended ' +
            'to be the heading for a new section or subsection. Instead use the markup patterns in ' +
            'the <a href="#common-idioms">Common idioms without dedicated elements</a> section of ' +
            'the specification.</p>')
    ;
    window.info("FORK: " + exports.landscape);
};
