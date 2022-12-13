"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFileWriterMain = void 0;
const process_identifier_1 = require("../../process/process-identifier");
const require_from_main_process_1 = require("../../require/require-from-main-process");
const log_file_config_1 = require("../file-config/log-file-config");
const log_file_writer_ipc_1 = require("./log-file-writer-ipc");
class LogFileWriterMain {
    constructor() {
        this.fsExtra = require_from_main_process_1.RequireFromMainProcess.fsExtra;
        this.os = require_from_main_process_1.RequireFromMainProcess.os;
    }
    static async create() {
        const logFileWriter = new LogFileWriterMain();
        await logFileWriter.fsExtra.ensureDir(log_file_config_1.LogFileConfig.dirName); // The directory needs to be created before calling fsExtra.promises.open function.
        const fileSystemFlag = 'a'; // 'a' is for "Open file for appending. The file is created if it does not exist." See https://nodejs.org/api/fs.html
        logFileWriter.fileHandle = await logFileWriter.fsExtra.promises.open(log_file_config_1.LogFileConfig.filePath, fileSystemFlag);
        return logFileWriter;
    }
    append(message) {
        return this.fileHandle.appendFile(message + this.os.EOL);
    }
}
if (process_identifier_1.ProcessIdentifier.isElectronMain) {
    exports.logFileWriterMain = LogFileWriterMain.create();
    log_file_writer_ipc_1.LogFileWriterIpcMain.configureReceivingMessageFromRenderer();
}
//# sourceMappingURL=log-file-writer-main.js.map