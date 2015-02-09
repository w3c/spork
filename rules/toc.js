/* globals info */

exports.name = "toc";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    var numStack = [0]
    ,   $fullToC = $("<ol class='brief toc'></ol>")
    ,   $toc = $("<ol class='toc'></ol>")
    ,   tocStack = [$toc] // managed as a reverse stack shift/unshift
    ;
    $("section").each(function () {
        var $s = $(this)
        ,   $hn = $s.children("h2, h3, h4, h5, h6").first()
        ,   id = $hn.attr("id")
        ,   depth = $s.parents("section").length
        ,   noNum = $hn.hasClass("no-num")
        ,   noToC = $hn.hasClass("no-toc")
        ;
        if (noToC) return;
        if (depth + 1 > numStack.length) {
            var $ol = $("<ol></ol>");
            tocStack[0].find("li").last().append($ol);
            tocStack.unshift($ol);
            numStack.push(0);
        }
        else if (depth + 1 < numStack.length) {
            while (tocStack.length > depth + 1) tocStack.shift();
            numStack.length = depth + 1;
        }
        numStack[depth]++;
        if (!noNum) {
            var newNum = numStack.join(".") + " ";
            $hn.html(
                $hn.html().replace(/^\s*?(?:[0-9]+\.)*[0-9]+\s+/, newNum)
            );
        }
        var $li = $("<li><a></a></li>")
                    .find("a")
                        .attr("href", "#" + id)
                    .html($hn.html())
                    .end()
                    .appendTo(tocStack[0]);
        if (depth === 0) {
            $("<li><a></a></li>")
                .find("a")
                    .attr("href", "#toc-" + id)
                    .html($hn.html())
                .end()
                .appendTo($fullToC);
            $li.attr("id", "toc-" + id);
        }
    });
    $("ol.brief.toc").first().replaceWith($fullToC);
    $("ol.toc").not(".brief").first().replaceWith($toc);

    info("updated ToC");
};
