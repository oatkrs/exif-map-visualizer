"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyRequire = void 0;
const process_identifier_1 = require("../process/process-identifier");
class ProxyRequire {
    static initialize() {
        if (!process_identifier_1.ProcessIdentifier.isElectron)
            return;
        if (process_identifier_1.ProcessIdentifier.isElectronMain) {
            // For Electron main process, use global.require function.
            this.electron = require('electron');
            this.os = require('os');
            this.path = require('path');
        }
        else {
            // For Electron renderer process, use window.require function.
            this.electron = window.require('electron');
            this.os = window.require('os');
            this.path = window.require('path');
        }
    }
}
exports.ProxyRequire = ProxyRequire;
ProxyRequire.electron = null;
ProxyRequire.os = null;
ProxyRequire.path = null;
ProxyRequire.initialize();
//# sourceMappingURL=proxy-require.js.map