"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlForMainWindow = void 0;
const path = require("path");
const create_prepended_logger_1 = require("../../src-shared/log/create-prepended-logger");
const live_reload_1 = require("../live-reload");
const fileServerLogger = (0, create_prepended_logger_1.createPrependedLogger)('[File Server]');
// Using 127.0.0.1 instead of localhost in order to avoid the case that localhost resolves to IPv6 address.
// Also, note that portscanner uses 127.0.0.1 instead of localhost for some reason.
// See https://github.com/baalexander/node-portscanner/pull/14
const ipv4Localhost = '127.0.0.1';
async function getUrlForMainWindow() {
    if (live_reload_1.LiveReload.enabled) {
        const url = `http://${ipv4Localhost}:4200`;
        fileServerLogger.info(`isLiveReloadMode === true, so "ng serve" command runs the server for ${url}`);
        return url;
    }
    // In order to switch from file protocol to http protocol,
    // the file server is implemented in October 2022, but there are port issues
    // which randomly happen notably with Windows Update and are difficult to handle.
    //  - https://stackoverflow.com/a/63810451/7947548
    //  - https://stackoverflow.com/q/48478869/7947548
    // Therefore, the file server implementation is removed, and file protocol continues to be used.
    const urlObj = new URL(path.join('file:', __dirname, '..', '..', 'dist', 'index.html'));
    const url = urlObj.href;
    fileServerLogger.info(`isLiveReloadMode === false, so the file URL is used. ${url}`);
    return url;
}
exports.getUrlForMainWindow = getUrlForMainWindow;
//# sourceMappingURL=file-server.js.map