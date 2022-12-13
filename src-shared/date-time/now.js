"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Now = void 0;
const moment = require("moment-timezone");
const date_time_format_1 = require("./date-time-format");
class Now {
    static get basicFormat() {
        return moment.utc().format(date_time_format_1.DateTimeFormat.ForLogging.basicFormat);
    }
    static get extendedFormat() {
        return moment.utc().format(date_time_format_1.DateTimeFormat.ForLogging.extendedFormat);
    }
}
exports.Now = Now;
//# sourceMappingURL=now.js.map