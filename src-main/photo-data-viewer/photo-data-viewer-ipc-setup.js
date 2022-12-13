"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipc_constants_1 = require("../../src-shared/ipc/ipc-constants");
const logger_1 = require("../../src-shared/log/logger");
const launch_photo_data_viewer_1 = require("./launch-photo-data-viewer");
electron_1.ipcMain.handle(ipc_constants_1.IpcConstants.PhotoDataViewer.Name, (event, ipcParams) => {
    logger_1.Logger.info(`Received the IPC invoke request about launching Photo Data Viewer.`);
    // noinspection JSIgnoredPromiseFromCall
    (0, launch_photo_data_viewer_1.launchPhotoDataViewer)(ipcParams);
});
//# sourceMappingURL=photo-data-viewer-ipc-setup.js.map