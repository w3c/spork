
var rfs = require("../lib/rfs");

exports.name = "fork-datacue";
exports.landscape = "W3C HTML has DataCue in text tracks.";
exports.transform = function (tmpl) {
    // § at end of guidelines-for-exposing-cues-in-various-formats-as-text-track-cues
    $("#guidelines-for-exposing-cues-in-various-formats-as-text-track-cues")
        .parent()
        .append(
            '<p>For <a href="#media-resource-specific-text-track">media-resource-specific text tracks</a> ' +
            'of <a href="#text-track-kind">kind</a> <code><a href="#dom-texttrack-kind-metadata">metadata</a></code>, ' +
            '<a href="#text-track-cue">text track cues</a> are exposed using the <code><a href="#datacue" style="">DataCue</a></code> object ' +
            'unless there is a more appropriate <code><a href="#texttrackcue">TextTrackCue</a></code> interface available. ' +
            'For example, if the <a href="#media-resource-specific-text-track">media-resource-specific text track</a> format is <a href="#webvtt">WebVTT</a>, ' +
            'then <code>VTTCue</code> is more appropriate.</p>'
        )
    ;
    
    // inject a complete section before #text-tracks-describing-chapters
    $("#text-tracks-describing-chapters")
        .parent()
        .before(tmpl.datacue)
    ;

    window.info("FORK: " + exports.landscape);
};
exports.params = function () {
    return [{
        datacue: rfs("res/datacue.html")
    }];
};
