"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFileWriter = void 0;
const environment_detector_1 = require("../../environment/environment-detector");
const process_identifier_1 = require("../../process/process-identifier");
const log_file_writer_main_1 = require("./log-file-writer-main");
const log_file_writer_renderer_1 = require("./log-file-writer-renderer");
let logFileWriter;
function initializeLogFileWriter() {
    if (environment_detector_1.EnvironmentDetector.isUnitTest)
        return;
    if (process_identifier_1.ProcessIdentifier.isElectronMain) {
        logFileWriter = log_file_writer_main_1.logFileWriterMain;
    }
    else {
        logFileWriter = log_file_writer_renderer_1.logFileWriterRenderer;
    }
}
class LogFileWriter {
    static async append(message) {
        if (environment_detector_1.EnvironmentDetector.isUnitTest)
            return;
        const fileWriter = await logFileWriter;
        await fileWriter.append(message);
    }
}
exports.LogFileWriter = LogFileWriter;
initializeLogFileWriter();
//# sourceMappingURL=log-file-writer.js.map