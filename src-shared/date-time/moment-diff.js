"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMomentDiffAsIso8601 = exports.getMomentDiff = void 0;
const moment = require("moment");
function getMomentDiff(args) {
    const startMoment = args.start.clone();
    const endMoment = args.end.clone();
    const duration = moment.duration(endMoment.diff(startMoment));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return { years, months, days, hours, minutes, seconds };
}
exports.getMomentDiff = getMomentDiff;
function getMomentDiffAsIso8601(args) {
    const diff = getMomentDiff(args);
    return `P${diff.years}Y${diff.months}M${diff.days}DT${diff.hours}H${diff.minutes}M${diff.seconds}S`;
}
exports.getMomentDiffAsIso8601 = getMomentDiffAsIso8601;
//# sourceMappingURL=moment-diff.js.map