
var rfs = require("../lib/rfs");

exports.name = "fork-tz-warning";
exports.landscape = "W3C HTML has a “health warning” about conversions to/from incremental time.";
exports.transform = function (data) {
    $("#valid-normalised-forced-utc-global-date-and-time-string")
        .parent()
        .before(data.warning)
    ;
};
exports.params = function () {
    return [{
        warning: rfs("res/global-dates-and-times/tz-warning.html")
    }];
};
