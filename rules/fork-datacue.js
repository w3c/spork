
var rfs = require("../lib/rfs");

exports.name = "fork-datacue";
exports.landscape = "W3C HTML has DataCue in text tracks.";
exports.transform = function (data) {
    // § at end of guidelines-for-exposing-cues-in-various-formats-as-text-track-cues
    $("#guidelines-for-exposing-cues-in-various-formats-as-text-track-cues")
        .parent()
        .append(data.guidelines)
    ;
    
    // inject a complete section before #text-tracks-describing-chapters
    $("#text-tracks-describing-chapters")
        .parent()
        .before(data.datacue)
    ;
};
exports.params = function () {
    return [{
        datacue: rfs("res/datacue/datacue.html")
    ,   guidelines: rfs("res/datacue/guidelines.html")
    }];
};
