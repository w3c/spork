window.info = function (str) {
    window.callPhantom({ info: str });
};
window.warn = function (str) {
    window.callPhantom({ warn: str });
};
window.saveSource = function () {
    window.callPhantom({ source: '<!DOCTYPE html>\n' + document.documentElement.outerHTML });
};
window.unplugResources = function () {
    window.callPhantom({ unplug: true });
};
window.escSel = function (sel) {
    return sel.replace(/([ #;?%&,.+*~':\"!^$[\]()=>|\/@])/g,'\\$1');
};
var curRule = '';
var assert = function (desc, $el, num) {
    if (typeof num === 'undefined') num = 1;
    if (num === '+') {
        if (!$el.length) window.callPhantom({ assert: desc, curRule: curRule });
    }
    else if ($el.length !== num) {
        window.callPhantom({ assert: desc, curRule: curRule });
    }
    return $el;
};
