"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoDataViewerWindowState = void 0;
const photo_data_viewer_logger_1 = require("../../src-shared/photo-data-viewer/photo-data-viewer-logger");
const user_data_storage_1 = require("../../src-shared/user-data-storage/user-data-storage");
const user_data_stroage_path_1 = require("../../src-shared/user-data-storage/user-data-stroage-path");
const photo_data_viewer_tracker_1 = require("./photo-data-viewer-tracker");
const isNumber = require('is-number');
const defaultWindowState = {
    x: 100,
    y: 100,
    width: 500,
    height: 500,
};
function toNumberOrElse(numStr, defaultNum) {
    return isNumber(numStr) ? Number(numStr) : defaultNum;
}
class PhotoDataViewerWindowState {
    static get() {
        const windowX = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowX, 'Fail to read');
        const windowY = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowY, 'Fail to read');
        const windowWidth = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowWidth, 'Fail to read');
        const windowHeight = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowHeight, 'Fail to read');
        return {
            x: toNumberOrElse(windowX, defaultWindowState.x),
            y: toNumberOrElse(windowY, defaultWindowState.y),
            width: toNumberOrElse(windowWidth, defaultWindowState.width),
            height: toNumberOrElse(windowHeight, defaultWindowState.height),
        };
    }
    static manage(params) {
        params?.browserWindow.on('resized', () => this.handleResized(params));
        params?.browserWindow.on('moved', () => this.handleMoved(params));
        params?.browserWindow.on('close', () => this.handleClose(params));
        params?.browserWindow.on('closed', () => this.handleClosed(params));
        this.browserWindowRefHolder.push(params);
    }
    static handleResized(params) {
        const bounds = this.getWindowBounds(params);
        if (!bounds) {
            return;
        }
        this.saveWindowBounds(bounds);
        photo_data_viewer_logger_1.photoDataViewerLogger.info(`Resized Window for ${params?.photo?.path}`);
        (0, photo_data_viewer_logger_1.logWindowBounds)(bounds, params.photo);
    }
    static handleMoved(params) {
        const bounds = this.getWindowBounds(params);
        if (!bounds) {
            return;
        }
        this.saveWindowBounds(bounds);
        photo_data_viewer_logger_1.photoDataViewerLogger.info(`Moved Window for ${params?.photo?.path}`);
        (0, photo_data_viewer_logger_1.logWindowBounds)(bounds, params.photo);
    }
    static handleClose(params) {
        // browserWindow will be destructed sometime after closing the window, and
        // calling functions of a destructed object results in "TypeError: Object has been destroyed" error.
        // Therefore, in this function, the window bounds are gotten from browserWindow in the first line.
        // Getting the bounds itself is fragile in the first place, but doing so is a best-effort approach
        // to save the bounds when the window is closed.
        // This is to address the issue that the bounds after moving/resizing by Windows logo key + arrow key are not saved
        // because it does not fire browserWindow's moved/resized events.
        try {
            const bounds = this.getWindowBounds(params);
            if (!bounds) {
                return;
            }
            this.saveWindowBounds(bounds);
            photo_data_viewer_logger_1.photoDataViewerLogger.info(`Close Window for ${params?.photo?.path}`);
            (0, photo_data_viewer_logger_1.logWindowBounds)(bounds, params.photo);
            (0, photo_data_viewer_tracker_1.trackClosingPhotoDataViewer)(bounds);
        }
        catch (error) {
            // Catching the error so that the Unhandled Promise Rejection dialog for "TypeError: Object has been destroyed" does not pop up.
            photo_data_viewer_logger_1.photoDataViewerLogger.warn(`Error occurred when closing the window for ${params?.photo?.path}`);
            photo_data_viewer_logger_1.photoDataViewerLogger.warn(`error?.toString?.(): ${error?.toString?.()}`);
            console.warn(error); // Print information such as stack trace in the console
        }
    }
    static handleClosed(params) {
        if (params) {
            params = null; // Ensure that the reference for browserWindow is removed.
        }
    }
    static getWindowBounds(params) {
        return params?.browserWindow?.getBounds?.();
    }
    static saveWindowBounds(bounds) {
        if (!bounds) {
            return;
        }
        const { x, y, width, height } = bounds;
        user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowX, x.toString());
        user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowY, y.toString());
        user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowWidth, width.toString());
        user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.PhotoDataViewer.WindowHeight, height.toString());
    }
}
exports.PhotoDataViewerWindowState = PhotoDataViewerWindowState;
// Hold the reference to browserWindow so that events can be handled by browserWindow.on function.
// noinspection JSMismatchedCollectionQueryUpdate
PhotoDataViewerWindowState.browserWindowRefHolder = [];
//# sourceMappingURL=photo-data-viewer-window-state.js.map