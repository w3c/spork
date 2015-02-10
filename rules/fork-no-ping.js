
exports.name = "fork-no-ping";
exports.landscape = "The @ping attribute is not implemented and does not seem to have a future, it is therefore dropped.";
exports.transform = function () {
    // #dynamic-changes-to-base-urls
    //      drop paragraph that mentions it
    $("#dynamic-changes-to-base-urls")
        .parent("section")
        .find("p:contains('If the hyperlink has a ping')")
        .remove();

    // <a> and <area> are quite similar
    var elDesc = function (id) {
            $("#" + id + " + dl.element > dd:contains('URLs to ping')").remove();
            var $idl = $("#" + id + " + dl.element pre.idl");
            $idl.html($idl.html().replace(/\[PutForwards.*?;\s+/, ""));
        }
    ,   linkList = function (id, removalType) {
            $("#" + id)
                .parent("section")
                .find("a[href='#ping']")
                .each(function (idx) {
                    var $a = $(this).parent()
                    ,   $p = $a.parent();
                    if (removalType[idx] === "midlist") {
                        $a.remove();
                        $p.html($p.html().replace(/,\s+,/, ","));
                    }
                    else if (removalType[idx] === "last") {
                        var $prev = $a.prevAll("code").first();
                        $a.remove();
                        $p.html($p.html().replace(/,\s+and/, ""));
                        $prev.before(document.createTextNode("and "));
                    }
                })
            ;
        }
    ,   dfn = function (id) {
            var $dfn = $("#" + id)
            ,   $dfnP = $dfn.parent("p")
            ;
            $dfn.remove();
            $dfnP.html($dfnP.html().replace(/,\s+,/, ","));
        }
    ;
    // <a> element
    //      attr
    //      IDL
    //      listed x3 in paragraphs
    elDesc("the-a-element");
    linkList("the-a-element", ["midlist", "and"]);
    dfn("dom-a-ping");

    // #hyperlink-auditing (drop)
    $("#hyperlink-auditing").parent("section").remove();

    // <area> element
    //      attr
    //      IDL
    //      listed x3 in paragraphs
    elDesc("the-area-element");
    linkList("the-a-element", ["and", "midlist"]);
    dfn("dom-area-ping");

    // text/ping section (that's its ID)
    $("#text\\/ping").parent("section").remove();

    // #elements-3
    //      in table for 'a', 'area'
    $("#elements-3")
        .parent("section")
        .find("table")
        .first()
        .find("a[href='#ping']")
        .each(function () {
            var $a = $(this).parent()
            ,   $cell = $a.parent()
            ;
            $a.remove();
            $cell.html($cell.html().replace(/;\s+;/, ";"));
        });

    // #mime-types-2
    //      drop from dl
    var $dt = $("#mime-types-2")
                .parent("section")
                .find("dt:contains('text/ping')")
    ;
    $dt.next("dd").remove();
    $dt.remove();

    window.info("FORK: " + exports.landscape);
};
