"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFormat = void 0;
var DateTimeFormat;
(function (DateTimeFormat) {
    let ForLogging;
    (function (ForLogging) {
        ForLogging.basicFormat = 'YYYYMMDDTHHmmss.SSS[Z]'; // Not very human-readable format, but this can be used in path.
        ForLogging.extendedFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'; // Human-readable format
    })(ForLogging = DateTimeFormat.ForLogging || (DateTimeFormat.ForLogging = {}));
    let ForUser;
    (function (ForUser) {
        ForUser.DateFormat_ISO8601Like = 'YYYY-MM-DD';
        ForUser.DateFormat_YYYYMMDD = 'YYYY/MM/DD';
        ForUser.DateFormat_DDMMYYYY = 'DD/MM/YYYY';
        ForUser.DateFormat_MMDDYYYY = 'MM/DD/YYYY';
        ForUser.DateFormat_Default = ForUser.DateFormat_ISO8601Like;
        ForUser.ClockSystemFormat_12h = '12-hour';
        ForUser.ClockSystemFormat_24h = '24-hour';
        ForUser.ClockSystemFormat_Default = ForUser.ClockSystemFormat_24h;
        ForUser.DateFormat_List = [
            ForUser.DateFormat_ISO8601Like,
            ForUser.DateFormat_YYYYMMDD,
            ForUser.DateFormat_DDMMYYYY,
            ForUser.DateFormat_MMDDYYYY,
        ];
        ForUser.ClockSystemFormat_List = [
            ForUser.ClockSystemFormat_12h,
            ForUser.ClockSystemFormat_24h
        ];
        ForUser.getMomentJsFormatString = (dateFormat, clockSystemFormat) => {
            const dateFormatMap = new Map();
            dateFormatMap.set(ForUser.DateFormat_ISO8601Like, 'YYYY-MM-DD ddd');
            dateFormatMap.set(ForUser.DateFormat_YYYYMMDD, 'YYYY/MM/DD ddd');
            dateFormatMap.set(ForUser.DateFormat_DDMMYYYY, 'DD/MM/YYYY ddd');
            dateFormatMap.set(ForUser.DateFormat_MMDDYYYY, 'MM/DD/YYYY ddd');
            const momentJsDateFormat = dateFormatMap.get(dateFormat);
            const momentJsFormat = clockSystemFormat === ForUser.ClockSystemFormat_24h
                ? `${momentJsDateFormat} HH:mm:ss`
                : `${momentJsDateFormat} hh:mm:ss a`;
            return momentJsFormat;
        };
    })(ForUser = DateTimeFormat.ForUser || (DateTimeFormat.ForUser = {}));
})(DateTimeFormat = exports.DateTimeFormat || (exports.DateTimeFormat = {}));
//# sourceMappingURL=date-time-format.js.map