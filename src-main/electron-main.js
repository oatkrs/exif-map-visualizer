"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainWindow = void 0;
require("./configure-electron-unhandled");
const electron_1 = require("electron");
const electronWebPreferences = require("../electron-util/electron-web-preferences");
require("../electron-util/configure-electron-remote-in-main-process");
const log_file_config_1 = require("../src-shared/log/file-config/log-file-config");
const logger_1 = require("../src-shared/log/logger");
require("./auto-update/configure-auto-update");
const file_server_1 = require("./file-server/file-server");
require("./menu/menu");
require("./photo-data-viewer/photo-data-viewer-ipc-setup");
require("./thumbnail-generation/thumbnail-generation-ipc-setup");
const configure_main_window_for_analytics_1 = require("./configure-main-window-for-analytics");
const handle_app_quit_1 = require("./handle-app-quit");
const live_reload_1 = require("./live-reload");
const record_at_app_launch_1 = require("./record-at-app-launch");
const window_config_1 = require("./window-config");
logger_1.Logger.info(`Log File Location: ${log_file_config_1.LogFileConfig.filePath}`);
const createWindow = async () => {
    const mainWindowState = (0, window_config_1.createMainWindowState)();
    exports.mainWindow = new electron_1.BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        webPreferences: electronWebPreferences,
    });
    (0, configure_main_window_for_analytics_1.configureMainWindowForAnalytics)(exports.mainWindow);
    exports.mainWindow.on('ready-to-show', () => {
        // Call recordAtAppLaunch on ready-to-show event so that
        // recordAtAppLaunch is called after IPC setup for analytics in the renderer process is done.
        // This is because recordAtAppLaunch calls Analytics.trackEvent which requires the IPC setup to be done.
        (0, record_at_app_launch_1.recordAtAppLaunch)();
    });
    exports.mainWindow.on('closed', () => { exports.mainWindow = null; });
    if (live_reload_1.LiveReload.enabled) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/../node_modules/electron`)
        });
    }
    const url = await (0, file_server_1.getUrlForMainWindow)();
    exports.mainWindow.loadURL(url);
    if (live_reload_1.LiveReload.enabled) {
        exports.mainWindow.webContents.openDevTools();
    }
    mainWindowState.manage(exports.mainWindow);
    logger_1.Logger.info('Launching the main window.');
};
try {
    // Disable hardware acceleration to address the error printed
    // as "Passthrough is not supported, GL is disabled, ANGLE is".
    electron_1.app.disableHardwareAcceleration();
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (exports.mainWindow === null) {
            createWindow();
        }
    });
    electron_1.app.on('quit', () => (0, handle_app_quit_1.handleAppQuit)());
    // Below is a workaround for the issue that displaying a file with "file://" protocol
    // on the browser using development server results in an error like
    // -------------------------------
    // GET file:///C:/temp/temp.JPG
    // net::ERR_UNKNOWN_URL_SCHEME
    // -------------------------------
    // This issue happens from Electron 9.
    // See https://github.com/electron/electron/issues/23757#issuecomment-640146333
    electron_1.app.whenReady().then(() => {
        electron_1.protocol.registerFileProtocol('file', (request, callback) => {
            const pathname = decodeURI(request.url.replace('file:///', ''));
            callback(pathname);
        });
    });
}
catch (e) {
    logger_1.Logger.error(e);
    logger_1.Logger.error('Fatal error occurred in main process. EXIF Map Visualizer is closing.');
    // TODO: Handle error with electron-unhandled
    process.exitCode = 1;
}
//# sourceMappingURL=electron-main.js.map