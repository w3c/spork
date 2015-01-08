
exports.name = "boilerplate";
exports.landscape = "A different title and boilerplate suitable for W3C.";
exports.transform = function () {
    // title
    $("title").text("HTML 5.1 Nightly"); // XXX this needs to be settable in the profile
    window.callPhantom({ info: "changed title" });

    // style
    $("<style></style>")
        .text([
                'header p.subline {color:#005A9C; font: 140% sans-serif;margin: 0.75em 0;}'
            ,   'div.head { margin: 0 0 1em; padding: 1em 0 0 0; }'
            ,   'div.head p { margin: 0; }'
            ,   'div.head h1 { margin: 0; }'
            ,   'div.head .logo { float: right; margin: 0 1em; }'
            ,   'div.head .logo img { border: none } /* remove border from top image */'
            ,   'div.head dl { margin: 1em 0; }'
            ,   'div.head p.copyright, div.head p.alt { font-size: x-small; font-style: oblique; margin: 0; }'
            ,   'body > .toc > li { margin-top: 1em; margin-bottom: 1em; }'
            ,   'body > .toc.brief > li { margin-top: 0.35em; margin-bottom: 0.35em; }'
            ,   'body > .toc > li > * { margin-bottom: 0.5em; }'
            ,   'body > .toc > li > * > li > * { margin-bottom: 0.25em; }'
            ,   '.toc, .toc li { list-style: none; }'
            ].join("\n"))
        .appendTo($("head"))
    ;
    $('<link href="http://www.w3.org/StyleSheets/TR/W3C-ED" rel="stylesheet" type="text/css">')
        .appendTo($("head"));
    window.callPhantom({ info: "injected style" });

    // boilerplate
    var date = new Date()
    ,   humanMonths = "January February March April May June July August September October November December".split(" ")
    ,   pad = function (num) {
            num = "" + num;
            if (num.length < 2) return "0" + num;
            return num;
        }
    ,   humanDate = pad(date.getDate()) + " " + humanMonths[date.getMonth()] + " " + date.getFullYear()
    ,   bp = [ // XXX this from profile too, or any external source
            '<div>'
        ,   '<header><p><a href="http://www.w3.org/"><img alt="W3C" height="48" src="http://www.w3.org/Icons/w3c_home" width="72"></a></p>'
        ,   '<h1 id="big-title">HTML 5.1 Nightly</h1>'
        ,   '<p class="no-num no-toc subline">A vocabulary and associated APIs for HTML and XHTML</p>'
        ,   '<p class="no-num no-toc subline">Editor\'s Draft ' + humanDate + '</p>'
        ,   '</header><dl><dt>Latest Published Version:</dt>'
        ,   '<dd><a href="http://www.w3.org/TR/html/">http://www.w3.org/TR/html/</a></dd>'
        ,   '<dt id="specification-editors">Editors:</dt>'
        ,   '<dd>WHATWG:</dd>'
        ,   '<dd><a href="mailto:ian@hixie.ch">Ian Hickson</a>, Google, Inc.</dd>'
        ,   '<dd>W3C:</dd>'
        ,   '<dd><a href="http://berjon.com/">Robin Berjon</a>, W3C</dd>'
        ,   '<dd><a href="mailto:sfaulkner@paciellogroup.com">Steve Faulkner</a>, The Paciello Group</dd>'
        ,   '<dd><a href="mailto:travil@microsoft.com">Travis Leithead</a>, Microsoft</dd>'
        ,   '<dd><a href="mailto:Erika.Doyle@microsoft.com">Erika Doyle Navara</a>, Microsoft</dd>'
        ,   '<dd><a href="mailto:eoconnor@apple.com">Edward O\'Connor</a>, Apple Inc.</dd>'
        ,   '<dd>For the <code><a href="embedded-content.html#the-img-element">img</a></code> and <code><a href="embedded-content.html#the-picture-element">picture</a></code> elements:</dd>'
        ,   '<dd><a class="p-name fn u-url url" href="http://xanthir.com/contact/">Tab Atkins</a> (<span class="p-org org">Google</span>)</dd>'
        ,   '<dd><a class="p-name fn u-email email" href="mailto:simonp@opera.com">Simon Pieters</a> (<span class="p-org org">Opera Software</span>)</dd>'
        ,   '<dd><a class="p-name fn u-url url" href="http://blog.yoav.ws/">Yoav Weiss</a></dd>'
        ,   '<dd><span class="p-name fn">Marcos Cáceres</span> (<span class="p-org org">Mozilla</span>)</dd>'
        ,   '<dd><a class="p-name fn u-url url" href="http://matmarquis.com/">Mat Marquis</a></dd>'
        ,   '</dl>'
        ,   '<p class="copyright"><a href="http://www.w3.org/Consortium/Legal/ipr-notice#Copyright">Copyright</a>'
        ,   '© ' + date.getFullYear() + ' <a href="http://www.w3.org/"><abbr title="World Wide'
        ,   'Web Consortium">W3C</abbr></a><sup>®</sup> (<a href="http://www.csail.mit.edu/"><abbr title="Massachusetts'
        ,   'Institute of Technology">MIT</abbr></a>, <a href="http://www.ercim.eu/"><abbr title="European Research'
        ,   'Consortium for Informatics and Mathematics">ERCIM</abbr></a>, <a href="http://www.keio.ac.jp/">Keio</a>, <a href="http://ev.buaa.edu.cn/">Beihang</a>), All Rights Reserved. W3C'
        ,   '<a href="http://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer">liability</a>,'
        ,   '<a href="http://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks">trademark</a>'
        ,   'and <a href="http://www.w3.org/Consortium/Legal/copyright-documents">document'
        ,   'use</a> rules apply.</p>'
        ,   '</div>'
    ].join("\n")    
    ;
    $("body hr").first().before(bp);
    window.callPhantom({ info: "updated boilerplate" });
    return {};
};
