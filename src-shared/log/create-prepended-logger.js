"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrependedLogger = exports.PrependedLogger = void 0;
const logger_1 = require("./logger");
class PrependedLogger {
    constructor(stringToPrepend) {
        this.stringToPrepend = stringToPrepend;
    }
    error(message, ...object) {
        const text = this.prependSpecifiedString(message);
        logger_1.Logger.error(text, ...object);
    }
    warn(message, ...object) {
        const text = this.prependSpecifiedString(message);
        logger_1.Logger.warn(text, ...object);
    }
    info(message, ...object) {
        const text = this.prependSpecifiedString(message);
        logger_1.Logger.info(text, ...object);
    }
    debug(message, ...object) {
        const text = this.prependSpecifiedString(message);
        logger_1.Logger.debug(text, ...object);
    }
    prependSpecifiedString(message) {
        return `${this.stringToPrepend} ${message}`;
    }
}
exports.PrependedLogger = PrependedLogger;
function createPrependedLogger(stringToPrepend) {
    return new PrependedLogger(stringToPrepend);
}
exports.createPrependedLogger = createPrependedLogger;
//# sourceMappingURL=create-prepended-logger.js.map