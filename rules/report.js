/*globals assert*/

exports.name = "report";
exports.landscape = null;
exports.transform = function (data) {
    window.info("Sending single-page to be saved.");
    window.saveSource("single-page.html", "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
    
    // splitting happens here
    var sections = [
            "introduction"
        ,   "infrastructure"
        ,   "dom"
        ,   "semantics"
        ,   "editing"
        ,   "browsers"
        ,   "webappapis"
        ,   "syntax"
        ,   "the-xhtml-syntax"
        ,   "rendering"
        ,   "obsolete"
        ,   "iana"
        ,   "index"
        ,   "references"
        ,   "acknowledgments"
        ]
    ,   idMap = {}
    ;
    
    // rewrite all links
    sections.forEach(function (sec) {
        assert("Section " + sec, 
        $("#" + sec)
            .parent())
            .find("[id]")
            .each(function () {
                idMap["#" + $(this).attr("id")] = sec;
            })
        ;
    });
    assert("Links to IDs",
    $("a[href^=#]"), "+").each(function () {
        var $a = $(this)
        ,   id = $a.attr("href")
        ;
        $a.attr("href", idMap[id] + ".html" + id);
    });
    
    // process all sections
    sections.forEach(function (sec, idx) {
        var doc = document.cloneNode(true)
        ,   $h = assert("Section " + sec, $("#" + sec, doc))
        ,   $sec = $h.parent()
        ;
        
        // add lateral navigation plus link up to Toc (at bottom too)
        var $nav = $("<nav class='prev_next'><a href='Overview.html#contents'>Table of contents</a></nav>", doc);
        if (idx !== 0) {
            $nav.prepend(" — ");
            $("#toc-" + sections[idx - 1], doc)
                .find("a:first")
                .prepend("← ")
                .clone()
                .prependTo($nav)
            ;
        }
        if (idx !== sections.length - 1) {
            $nav.append(" — ");
            $("#toc-" + sections[idx + 1], doc)
                .find("a:first")
                .append(" →")
                .clone()
                .appendTo($nav)
            ;
        }
        
        // keep only that section and ToC part
        $sec.prevAll("section").each(function () {
            var $s = $(this);
            if ($s.find("#contents").length) {
                var $li = assert("Toc group for " + sec, $s.find("#toc-" + sec));
                $li.prevAll("li").remove();
                $li.nextAll("li").remove();
                return;
            }
            $s.remove();
        });
        $sec.nextAll("section").remove();
        
        // drop all headers after the subtitle
        assert("Parts of div.head not the title", $("div.head > :not(header)", doc), 2).remove();
        
        // set the title to the section title + the spec title
        assert("There's a title", $("title")).text($h.text() + " | " + data.title);
        
        // save!
        window.info("Sending " + sec + " to be saved.");
        window.saveSource(sec + ".html", "<!DOCTYPE html>\n" + doc.documentElement.outerHTML);
    });
    
    // save Overview too
    var doc = document.cloneNode(true);
    $("#contents", doc).nextAll("section").remove();
    window.info("Sending Overview to be saved.");
    window.saveSource("Overview.html", "<!DOCTYPE html>\n" + doc.documentElement.outerHTML);
};
exports.params = function (conf) {
    return [{
        title:  conf.title || ""
    }];
};
