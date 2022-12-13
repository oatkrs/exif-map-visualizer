"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireFromMainProcess = void 0;
const process_identifier_1 = require("../process/process-identifier");
class RequireFromMainProcess {
    static initialize() {
        if (!process_identifier_1.ProcessIdentifier.isElectron)
            return;
        if (process_identifier_1.ProcessIdentifier.isElectronMain) {
            // For Electron main process, use global.require function.
            this.fsExtra = require('fs-extra');
            this.electron = require('electron');
            this.os = require('os');
            this.path = require('path');
        }
        else {
            // For Electron renderer process, use window.require('@electron/remote').require function.
            const remote = window.require('@electron/remote');
            this.fsExtra = remote.require('fs-extra');
            this.electron = remote.require('electron');
            this.os = remote.require('os');
            this.path = remote.require('path');
        }
    }
}
exports.RequireFromMainProcess = RequireFromMainProcess;
RequireFromMainProcess.fsExtra = null;
RequireFromMainProcess.electron = null;
RequireFromMainProcess.os = null;
RequireFromMainProcess.path = null;
RequireFromMainProcess.initialize();
//# sourceMappingURL=require-from-main-process.js.map