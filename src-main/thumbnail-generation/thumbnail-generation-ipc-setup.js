"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipc_constants_1 = require("../../src-shared/ipc/ipc-constants");
const thumbnail_generation_logger_1 = require("../../src-shared/thumbnail/generation/thumbnail-generation-logger");
const thumbnail_generation_1 = require("./thumbnail-generation");
electron_1.ipcMain.handle(ipc_constants_1.IpcConstants.ThumbnailGenerationInMainProcess.Name, (event, allHeifFilePaths, heifFilePathsToGenerateThumbnail) => {
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Received the IPC invoke request about thumbnail generation in the main process.`);
    (0, thumbnail_generation_1.handleThumbnailGenerationIpcRequest)(allHeifFilePaths, heifFilePathsToGenerateThumbnail);
});
//# sourceMappingURL=thumbnail-generation-ipc-setup.js.map