
function canon () {
    var path = location.pathname;
    if (/html\/wg\/drafts\/html\/master/.test(path))
        return "http://www.w3.org/html/wg/drafts/html/master/";
    if (/html\/wg\/drafts\/html\/wd/.test(path))
        return "http://www.w3.org/html/wg/drafts/html/wd/";
    else if (/\/TR\/html[\d\.-]*\//.test(path))
        return location.href.replace(/(^.*?\/TR\/html[\d\.-]*\/).*/, "$1");
    else if (/\/TR\/\d{4}\/\w{2,4}-html[\d\.-]*?-\d{8}\//.test(path))
        return location.href.replace(/(^.*?\/TR\/\d{4}\/\w{2,4}-html[\d\.-]*?-\d{8}\/).*/, "$1");
    else
        return; // give up
}

function fnord () {
    var base = canon();
    if (!base) return;
    var path = location.pathname
    ,   file = path.replace(/^.*\//, "")
    ,   frag = location.hash
    ,   xhr = new XMLHttpRequest();
    if (!frag) return;
    if (file === "404.html") return;
    if (document.getElementById(frag.replace("#", ""))) return;
    xhr.open("GET", base + "id-map.json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var idMap = JSON.parse(xhr.responseText)
            ,   page = idMap[frag]
            ;
            if (!page) return;
            if (page + ".html" === file) return;
            location.assign(base + page + ".html" + frag);
        }
    };
    xhr.send();
}


