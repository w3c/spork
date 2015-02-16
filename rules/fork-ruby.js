
var rfs = require("../lib/rfs");

exports.name = "fork-ruby";
exports.landscape = "W3C HTML has a ruby model that matches both users' needs and implementations.";
exports.transform = function (sources) {
    // remove from obsolete
    var $objDT = $("#rb").parent();
    $objDT.next("dd").remove();
    $objDT.remove();
    
    // replace element sections
    for (var k in sources) $("#" + k).replaceWith(sources[k]);

    // various changes to the parsing algorithm
    var $og = $("#parsing-main-inbody")
                    .parent()
                    .find("dl.switch:first dt:contains('\"math\"'):first")
    ;
    // remove previous variant
    $og.prev("dd").remove();
    $og.prev("dt").remove();
    $og.before('<dt>A start tag whose tag name is one of: "rb", "rtc"</dt>');
    $og.before('<dd><p>If the <a href="#stack-of-open-elements">stack of open elements</a> <a href="#has-an-element-in-scope" data-anolis-xref="has an element in scope">has a' +
               '<code>ruby</code> element in scope</a>, then <a href="#generate-implied-end-tags">generate implied end tags</a>. If the' +
               '<a href="#current-node">current node</a> is not then a <code><a href="#the-ruby-element">ruby</a></code> element, this is a <a href="#parse-error">parse' +
               'error</a>.</p><p><a href="#insert-an-html-element">Insert an HTML element</a> for the token.</p></dd>');
    $og.before('<dt>A start tag whose tag name is "rt", "rp"</dt>');
    $og.before('<dd><p>If the <a href="#stack-of-open-elements">stack of open elements</a> <a href="#has-an-element-in-scope" data-anolis-xref="has an element in scope">has a' +
               '<code>ruby</code> element in scope</a>, then <a href="#generate-implied-end-tags">generate implied end tags</a>, except ' +
               'for <code><a href="#the-rtc-element">rtc</a></code> elements. If the <a href="#current-node">current node</a> is not then a <code><a href="#the-ruby-element">ruby</a></code>' +
               'element or an <code><a href="#the-rtc-element">rtc</a></code> element, this is a <a href="#parse-error">parse error</a>.</p>' +
               '<p><a href="#insert-an-html-element">Insert an HTML element</a> for the token.</p></dd>');

    var $eof = $("#parsing-main-inbody")
                    .parent()
                    .find("dl.switch:first dt:contains('\"end-of-file\"'):first")
    ;
    $eof.next("dd")
        .find("ol li:first")
        .html(
            '<p>If there is a node in the <a href="#stack-of-open-elements">stack of open elements</a> that is not either a' +
            '<code><a href="#the-dd-element">dd</a></code> element, a <code><a href="#the-dt-element">dt</a></code> element, an <code><a href="#the-li-element">li</a></code> element, an ' +
            '<code><a href="#the-optgroup-element">optgroup</a></code> element, an <code><a href="#the-option-element">option</a></code> element, a <code><a href="#the-p-element">p</a></code> ' +
            'element, an <code><a href="#the-rb-element">rb</a></code> element, an <code><a href="#the-rp-element">rp</a></code> element, an <code><a href="#the-rt-element">rt</a></code> element, ' +
            'an <code><a href="#the-rtc-element">rtc</a></code> element, a <code><a href="#the-tbody-element">tbody</a></code> element, a <code><a href="#the-td-element">td</a></code> element, a <code><a href="#the-tfoot-element">tfoot</a></code> element, ' +
            'a <code><a href="#the-th-element">th</a></code> element, a <code><a href="#the-thead-element">thead</a></code> element, a <code><a href="#the-tr-element">tr</a></code> element, the ' +
            '<code><a href="#the-body-element">body</a></code> element, or the <code><a href="#the-html-element">html</a></code> element, then this is a <a href="#parse-error">parse error</a>.</p>'
        )
    ;
    $eof.nextAll("dt:contains('body'):first, dt:contains('body'):first")
        .each(function () {
            $(this)
                .next("dd")
                .find("p:eq(2)")
                .html(
                    '<p>Otherwise, if there is a node in the <a href="#stack-of-open-elements">stack of open elements</a> that is not either a ' +
                    '<code><a href="#the-dd-element">dd</a></code> element, a <code><a href="#the-dt-element">dt</a></code> element, an <code><a href="#the-li-element">li</a></code> element, an ' +
                    '<code><a href="#the-optgroup-element">optgroup</a></code> element, an <code><a href="#the-option-element">option</a></code> element, a <code><a href="#the-p-element">p</a></code> element, an ' +
                    '<code><a href="#the-rb-element">rb</a></code> element, an <code><a href="#the-rp-element">rp</a></code> element, an <code><a href="#the-rt-element">rt</a></code> element, an ' +
                    '<code><a href="#the-rtc-element">rtc</a></code> element, a <code><a href="#the-tbody-element">tbody</a></code> element, a <code><a href="#the-td-element">td</a></code> element, a ' +
                    '<code><a href="#the-tfoot-element">tfoot</a></code> element, a <code><a href="#the-th-element">th</a></code> element, a <code><a href="#the-thead-element">thead</a></code> element, a ' +
                    '<code><a href="#the-tr-element">tr</a></code> element, the <code><a href="#the-body-element">body</a></code> element, or the <code><a href="#the-html-element">html</a></code> element, then ' +
                    'this is a <a href="#parse-error">parse error</a>.</p>'
                )
            ;
        
        })
    ;
    var $stRtRp = $("#parsing-main-inbody")
                    .parent()
                    .find("dl.switch:first dt:contains('A start tag whose tag name is \"rt\", \"rp\"'):first")
    ;
    $stRtRp.before('<dt>A start tag whose tag name is one of: "rb", "rtc"</dt>');
    $stRtRp.before(
        '<dd><p>If the <a href="#stack-of-open-elements">stack of open elements</a> <a href="#has-an-element-in-scope" data-anolis-xref="has an element in scope">has a ' +
        '<code>ruby</code> element in scope</a>, then <a href="#generate-implied-end-tags">generate implied end tags</a>, except ' +
        'for <code><a href="#the-rtc-element">rtc</a></code> elements. If the <a href="#current-node">current node</a> is not then a <code><a href="#the-ruby-element">ruby</a></code> ' +
        'element or an <code><a href="#the-rtc-element">rtc</a></code> element, this is a <a href="#parse-error">parse error</a>.</p>' +
        '<p><a href="#insert-an-html-element">Insert an HTML element</a> for the token.</p></dd>'
    );
    $stRtRp
        .next("dd")
        .find("p:first")
        .html(
            '<p>If the <a href="#stack-of-open-elements">stack of open elements</a> <a href="#has-an-element-in-scope" data-anolis-xref="has an element in scope">has a' +
            '<code>ruby</code> element in scope</a>, then <a href="#generate-implied-end-tags">generate implied end tags</a>, except ' +
            'for <code><a href="#the-rtc-element">rtc</a></code> elements. If the <a href="#current-node">current node</a> is not then a <code><a href="#the-ruby-element">ruby</a></code> ' +
            'element or an <code><a href="#the-rtc-element">rtc</a></code> element, this is a <a href="#parse-error">parse error</a>.</p>'
        )
    ;
    
    // rendering
    var $phrasingCSS = $("#phrasing-content-0").parent().find("pre.css:first");
    $phrasingCSS.text($phrasingCSS.text().replace(
        /ruby[\s\S]+?rt[\s\S]+?\}/
    ,   [
            "ruby { display: ruby; }"
        ,   "rb   { display: ruby-base; white-space: nowrap; }"
        ,   "rt   {"
        ,   "    display: ruby-text;"
        ,   "    white-space: nowrap;"
        ,   "    font-size: 50%;"
        ,   "    font-variant-east-asian: ruby;"
        ,   "    text-emphasis: none;"
        ,   "}"
        ,   "rbc  { display: ruby-base-container; }"
        ,   "rtc  { display: ruby-text-container; }"
        ,   "ruby, rb, rt, rbc, rtc { unicode-bidi: isolate; }"
        ].join("\n")
    ));
    
    // table of elements
    var $qTR = $("#elements-3").parent().find("table:first tr:contains('Quotation')");
    $qTR.after(
        '<tr><th><code><a href="#the-rb-element">rb</a></code></th><td>Ruby base</td><td>none</td>' +
        '<td><code><a href="#the-ruby-element">ruby</a></code>; <code><a href="#the-template-element">template</a></code></td>' +
        '<td><a href="#phrasing-content-1" data-anolis-xref="Phrasing content">phrasing</a></td>' +
        '<td><a href="#global-attributes" data-anolis-xref="global attributes">globals</a></td>' +
        '<td><code><a href="#htmlelement">HTMLElement</a></code></td></tr>'
    );
    $qTR
        .next("tr")
        .next("tr") // rp
        .find("td:eq(2) code:contains('ruby')")
        .after('<code><a href="#the-rtc-element">rtc</a></code>')
        .after(document.createTextNode("; "))
    ;
    var $rtTR = $qTR.next("tr").next("tr").next("tr");
    $rtTR
        .find("td:eq(2) code:contains('ruby')")
        .after('<code><a href="#the-rtc-element">rtc</a></code>')
        .after(document.createTextNode("; "))
    ;
    $rtTR.after(
        '<tr><th><code><a href="#the-rtc-element">rtc</a></code></th><td>Ruby annotation text container</td>' +
        '<td>none</td><td><code><a href="#the-ruby-element">ruby</a></code>;' +
        '<code><a href="#the-template-element">template</a></code></td>' +
        '<td><a href="#phrasing-content-1" data-anolis-xref="Phrasing content">phrasing</a></td>' +
        '<td><a href="#global-attributes" data-anolis-xref="global attributes">globals</a></td>' +
        '<td><code><a href="#htmlelement">HTMLElement</a></code></td></tr>'
    );
    $rtTR
        .next("tr")
        .next("tr") // ruby
        .find("td:eq(3) code:contains('rp')")
        .after('<code><a href="#the-rb-element">rb</a></code>')
        .after(document.createTextNode("; "))
        .after('<code><a href="#the-rtc-element">rtc</a></code>')
        .after(document.createTextNode("; "))
    ;
    
    // table of interfaces
    var $rpTr = $("#element-interfaces")
                    .parent()
                    .find("table:first a[href='#the-rp-element']")
                    .parent().parent().parent()
    ;
    $rpTr
        .before('<tr><td><code><a href="#the-rb-element">rb</a></code></td><td> <code><a href="#htmlelement">HTMLElement</a></code></td></tr>');
    $rpTr
        .next("tr")
        .after('<tr><td> <code><a href="#the-rtc-element">rtc</a></code></td><td> <code><a href="#htmlelement">HTMLElement</a></code></td></tr>');
    
    // usage summary
    $("#usage-summary")
        .parent()
        .find("table:first tr:contains('ruby'):first")
        .replaceWith(
            '<tr><td><code><a href="#the-ruby-element">ruby</a></code>, <code><a href="#the-rb-element">rb</a></code>, <code><a href="#the-rp-element">rp</a></code>, <code><a href="#the-rt-element">rt</a></code>, <code><a href="#the-rtc-element">rtc</a></code>' +
            '</td><td>Ruby annotations</td><td><pre class="example"><strong>&lt;ruby&gt; &lt;rb&gt;OJ &lt;rp&gt;(&lt;rtc&gt;&lt;rt&gt;Orange Juice&lt;/rtc&gt;&lt;rp&gt;)&lt;/ruby&gt;</strong></pre></td></tr>'
        )
    ;

    // optional end tags
    var $ogp = $("#optional-tags").parent().find("p:contains('optgroup'):first");
    $ogp.prev("tr").remove();
    $ogp.prev("tr").remove();
    $ogp.before(
        '<p>An <code><a href="#the-rb-element">rb</a></code> element\'s <a href="#syntax-end-tag" data-anolis-xref="syntax-end-tag">end tag</a> may be omitted if the ' +
        '<code><a href="#the-rb-element">rb</a></code> element is immediately followed by an <code><a href="#the-rb-element">rb</a></code>, <code><a href="#the-rt-element">rt</a></code>, ' +
        '<code><a href="#the-rtc-element">rtc</a></code> or <code><a href="#the-rp-element">rp</a></code> element, or if there is no more content in the parent element.</p>'
    );
    $ogp.before(
        '<p>An <code><a href="#the-rt-element">rt</a></code> element\'s <a href="#syntax-end-tag" data-anolis-xref="syntax-end-tag">end tag</a> may be omitted if the ' +
        '<code><a href="#the-rt-element">rt</a></code> element is immediately followed by an <code><a href="#the-rb-element">rb</a></code>, <code><a href="#the-rt-element">rt</a></code>, <code><a href="#the-rtc-element">rtc</a></code> or ' +
        '<code><a href="#the-rp-element">rp</a></code> element, or if there is no more content in the parent element.</p>'
    );
    $ogp.before(
        '<p>An <code><a href="#the-rtc-element">rtc</a></code> element\'s <a href="#syntax-end-tag" data-anolis-xref="syntax-end-tag">end tag</a> may be omitted if ' +
        'the <code><a href="#the-rtc-element">rtc</a></code> element is immediately followed by an <code><a href="#the-rb-element">rb</a></code> or <code><a href="#the-rtc-element">rtc</a></code> ' +
        'element, or if there is no more content in the parent element.</p>'
    );
    $ogp.before(
        '<p>An <code><a href="#the-rp-element">rp</a></code> element\'s <a href="#syntax-end-tag" data-anolis-xref="syntax-end-tag">end tag</a> may be omitted if the ' +
        '<code><a href="#the-rp-element">rp</a></code> element is immediately followed by an <code><a href="#the-rb-element">rb</a></code>, <code><a href="#the-rt-element">rt</a></code>, ' +
        '<code><a href="#the-rtc-element">rtc</a></code> or <code><a href="#the-rp-element">rp</a></code> element, or if there is no more content in the parent element.</p>'
    );
    
    window.info("FORK: " + exports.landscape);
};
exports.params = function () {
    var data = {}
    ,   sections = ["closing-elements-that-have-implied-end-tags"].concat("rb rp rt rtc ruby".split(" "))
    ;
    sections
        .forEach(function (el) {
            data[el] = rfs("res/ruby/" + el + ".html");
        });
    return [data];
};
exports.copy = {
    "ruby/images/composition.png":              "images/composition.png"
,   "ruby/images/group.png":                    "images/group.png"
,   "ruby/images/hokekyou.png":                 "images/hokekyou.png"
,   "ruby/images/group-double.png":             "images/group-double.png"
,   "ruby/images/mono-or-jukugo-double.png":    "images/mono-or-jukugo-double.png"
};
