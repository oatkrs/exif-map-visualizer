"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFileWriterIpcRenderer = exports.LogFileWriterIpcMain = void 0;
const proxy_require_1 = require("../../require/proxy-require");
const log_file_writer_main_1 = require("./log-file-writer-main");
class LogFileWriterIpcChannelName {
}
LogFileWriterIpcChannelName.append = 'log-file-writer-append';
class LogFileWriterIpcMain {
    static configureReceivingMessageFromRenderer() {
        this.ipcMain.on(LogFileWriterIpcChannelName.append, async (event, message) => {
            const fileWriter = await log_file_writer_main_1.logFileWriterMain;
            await fileWriter.append(message);
        });
    }
}
exports.LogFileWriterIpcMain = LogFileWriterIpcMain;
LogFileWriterIpcMain.ipcMain = proxy_require_1.ProxyRequire.electron.ipcMain;
class LogFileWriterIpcRenderer {
    static sendMessageToMain(message) {
        this.ipcRenderer.send(LogFileWriterIpcChannelName.append, message);
    }
}
exports.LogFileWriterIpcRenderer = LogFileWriterIpcRenderer;
LogFileWriterIpcRenderer.ipcRenderer = proxy_require_1.ProxyRequire.electron.ipcRenderer;
//# sourceMappingURL=log-file-writer-ipc.js.map