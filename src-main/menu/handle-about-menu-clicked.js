"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAboutMenuClicked = void 0;
const analytics_1 = require("../../src-shared/analytics/analytics");
const ipc_constants_1 = require("../../src-shared/ipc/ipc-constants");
const logger_1 = require("../../src-shared/log/logger");
const electron_main_1 = require("../electron-main");
const handleAboutMenuClicked = () => {
    logger_1.Logger.info(`[Main Window Menu] Clicked "About EXIF Map Visualizer".`);
    analytics_1.Analytics.trackEvent('Main Window Menu', 'Clicked "About EXIF Map Visualizer"');
    if (!electron_main_1.mainWindow)
        return;
    electron_main_1.mainWindow.webContents.send(ipc_constants_1.IpcConstants.AboutBox.Name);
};
exports.handleAboutMenuClicked = handleAboutMenuClicked;
//# sourceMappingURL=handle-about-menu-clicked.js.map