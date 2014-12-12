
exports.name = "outlinify";
exports.landscape = ""; // does nothing at that level
exports.transform = function () {
    var sectioningContent = "article, aside, nav, section"
    // ,   sectioningRoot = "blockquote, body, details, dialog, fieldset, figure, td"
    ,   sectioningRoot = "body"
    ,   headingContent = "h1, h2, h3, h4, h5, h6"
    ,   currentOutlineTarget = null
    ,   currentSection = null
    ,   stack = [] // NOTE: for convenience we use a reverse stack (shift()/unshift())
    ,   TOP = 0
    ,   rank = function ($el) {
            return 0 + $el[0].tagName.replace(/^h/i, "");
        }
    ,   newSection = function ($el) {
            return { heading: null, impliedHeading: false, outlineTarget: $el, outline: [] };
        }
    ,   walkStep = function (phase, $el) {
            var isExit = phase === "exit"
            ,   isEntry = !isExit
            ;
            // When exiting an element, if that element is the element at the top of the stack
            if (isExit && $el.is(stack[TOP])) {
                stack.shift();
                return;
            }
            
            // If the top of the stack is a heading content element or an element with a hidden attribute
            if (stack[TOP].is(headingContent) || stack[TOP].attr("hidden")) return;
            
            // When entering an element with a hidden attribute
            if (isEntry && $el.attr("hidden")) {
                stack.unshift($el);
                return;
            }
            
            // When entering a sectioning content element
            if (isEntry && $el.is(sectioningContent)) {
                if (currentOutlineTarget !== null) {
                    if (!currentSection.heading) currentSection.impliedHeading = true;
                    stack.unshift(currentOutlineTarget);
                }
                currentOutlineTarget = $el;
                currentSection = newSection(currentOutlineTarget);
                currentOutlineTarget.outline = [currentSection];
                return;
            }
            
            // When exiting a sectioning content element, if the stack is not empty
            if (isExit && $el.is(sectioningContent) && stack.length) {
                if (!currentSection.heading) currentSection.impliedHeading = true;
                currentOutlineTarget = stack.shift();
                currentSection = currentOutlineTarget.outline[currentOutlineTarget.outline.length - 1];
                currentSection.outline = currentSection.outline.concat($el.outline);
                return;
            }
            
            // NOTE: we are restricting to <body> for now
            // When entering a sectioning root element
            if (isEntry && $el.is(sectioningRoot)) {
                if (currentOutlineTarget) stack.unshift(currentOutlineTarget);
                currentOutlineTarget = $el;
                currentOutlineTarget.parentSection = currentSection;
                currentSection = newSection(currentOutlineTarget);
                currentOutlineTarget.outline = [currentSection];
                return;
            }
            
            // NOTE: we are restricting to <body> for now
            // When exiting a sectioning root element, if the stack is not empty
            if (isExit && $el.is(sectioningRoot) && stack.length) {
                if (!currentSection.heading) currentSection.impliedHeading = true;
                currentSection = currentOutlineTarget.parentSection;
                currentOutlineTarget = stack.shift();
                return;
            }
            
            // When exiting a sectioning content element or a sectioning root element (when the stack is empty)
            if (isExit && ($el.is(sectioningContent) || $el.is(sectioningRoot))) {
                if (!currentSection.heading) currentSection.impliedHeading = true;
                return false; // this stops the tree walk
            }
            
            // When entering a heading content element
            if (isEntry && $el.is(headingContent)) {
                var elementRank = rank($el)
                ,   lastSectionOfCurrentOutlineTarget = currentOutlineTarget.outline[currentOutlineTarget.outline.length - 1]
                ,   lastSectionRank = lastSectionOfCurrentOutlineTarget.impliedHeading ? 0 : rank(lastSectionOfCurrentOutlineTarget.heading)
                ;
                
                if (!currentSection.heading) currentSection.heading = $el;
                else if (elementRank >= lastSectionRank || lastSectionOfCurrentOutlineTarget.impliedHeading) {
                    currentSection = newSection();
                    currentOutlineTarget.outline.push(currentSection);
                    currentSection.heading = $el;
                }
                else {
                    var candidateSection = currentSection;
                    while (true) {
                        if (elementRank < rank(candidateSection.heading)) {
                            currentSection = newSection();
                            candidateSection.outline.push(currentSection);
                            currentSection.heading = $el;
                            break;
                        }
                        // XXX we haven't tracked parents
                        // XXX use https://github.com/hoyois/html5outliner/blob/master/HTMLOutliner.js instead?
                    }
                }
            }
        }
    ;
    $("body, body *").each(function () { return walkStep($(this)); });

    window.callPhantom({ info: "outline built using <section> elements" });
    return {};
};
