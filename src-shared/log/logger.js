"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const now_1 = require("../date-time/now");
const environment_detector_1 = require("../environment/environment-detector");
const process_identifier_1 = require("../process/process-identifier");
const log_file_writer_1 = require("./file-writer/log-file-writer");
class LoggerImpl {
    static generateLogText(message, level) {
        const processType = process_identifier_1.ProcessIdentifier.processType;
        return `[${now_1.Now.extendedFormat}] [${processType}] [${level}] ${message}`;
    }
    static appendToLogFile(message) {
        log_file_writer_1.LogFileWriter.append(message);
    }
}
class Logger {
    static error(message, ...object) {
        const text = LoggerImpl.generateLogText(message, 'error');
        console.error(text, ...object);
        LoggerImpl.appendToLogFile(text);
    }
    static warn(message, ...object) {
        const text = LoggerImpl.generateLogText(message, 'warn');
        console.warn(text, ...object);
        LoggerImpl.appendToLogFile(text);
    }
    static info(message, ...object) {
        if (environment_detector_1.EnvironmentDetector.isUnitTest)
            return;
        const text = LoggerImpl.generateLogText(message, 'info');
        console.info(text, ...object);
        LoggerImpl.appendToLogFile(text);
    }
    static infoWithoutAppendingFile(message, ...object) {
        if (environment_detector_1.EnvironmentDetector.isUnitTest)
            return;
        const text = LoggerImpl.generateLogText(message, 'info');
        console.info(text, ...object);
    }
    static debug(message, ...object) {
        if (environment_detector_1.EnvironmentDetector.isUnitTest)
            return;
        const text = LoggerImpl.generateLogText(message, 'debug');
        console.debug(text, ...object);
        LoggerImpl.appendToLogFile(text);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map