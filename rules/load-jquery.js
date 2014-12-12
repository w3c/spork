
exports.name = "load-jquery";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    var el = document.createElement("script");
    el.src = "https://code.jquery.com/jquery-2.1.1.min.js";
    el.onload = function () {
        document.body.classList.add("spork-jq-loaded");
    };
    document.body.appendChild(el);
    window.callPhantom({ info: "loading jquery" });
    return {};
};
// the next rule won't run before this is set
exports.wait = "spork-jq-loaded";
