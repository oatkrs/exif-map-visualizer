"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFileWriterRenderer = void 0;
const process_identifier_1 = require("../../process/process-identifier");
const log_file_writer_ipc_1 = require("./log-file-writer-ipc");
class LogFileWriterRenderer {
    async append(message) {
        log_file_writer_ipc_1.LogFileWriterIpcRenderer.sendMessageToMain(message);
    }
}
if (process_identifier_1.ProcessIdentifier.isElectronRenderer) {
    exports.logFileWriterRenderer = Promise.resolve(new LogFileWriterRenderer());
}
//# sourceMappingURL=log-file-writer-renderer.js.map