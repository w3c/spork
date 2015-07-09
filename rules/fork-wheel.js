/*global assert*/

exports.name = "fork-wheel";
exports.landscape = "The 'mousewheel' event is abandoned";
exports.transform = function (data) {
    assert("mousewheel event",
    $("#event-mousewheel"))
      .replaceWith("<dfn id=event-wheel><code>wheel</code></dfn>")
    ;
    assert("onmousewheel",
    $("#global-attributes\\:handler-onmousewheel"))
      .replaceWith("<code id=global-attributes:handler-onwheel><a href=#handler-onwheel>onwheel</a></code>")
    ;
    assert("8.1.5.2 Event handlers on elements, Document objects, and Window",
    $("#event-handlers-on-elements\\,-document-objects\\,-and-window-objects"))
      .next("div")
      .first()
      .next("p")
      .remove()
    ;
    assert("onmousewheel", $("#handler-onmousewheel"))
      .replaceWith("<dfn id=handler-onwheel><code>onwheel</code></dfn>")
    ;
    assert("mousewheel",
      $("#event-handlers-on-elements\\,-document-objects\\,-and-window-objects\\:event-mousewheel"))
      .replaceWith("<code id=event-handlers-on-elements,-document-objects,-and-window-objects:event-wheel><a href=#event-wheel>wheel</a></code>")
    ;
    assert("onmousewheel",
      $("#idl-definitions\\:handler-onmousewheel"))
      .replaceWith("<a href=#handler-onwheel id=idl-definitions:handler-onwheel>onwheel</a>")
    ;
    assert("onmousewheel", $("#ix-handler-onmousewheel"))
      .replaceWith("<th id=ix-handler-onwheel> <code>onwheel</code>");
    assert("HTML elements", $("#attributes-3\\:handler-onmousewheel"))
      .replaceWith("<a href=#handler-onwheel id=attributes-3:handler-onwheel>HTML elements</a>");
    assert("mousewheel", $("#attributes-3\\:event-mousewheel"))
      .replaceWith("<code id=attributes-3:event-wheel><a href=#event-wheel>wheel</a></code>");

};
