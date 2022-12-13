"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchPhotoDataViewer = void 0;
const electron_1 = require("electron");
const photo_data_viewer_logger_1 = require("../../src-shared/photo-data-viewer/photo-data-viewer-logger");
const open_url_1 = require("../../src-shared/url/open-url");
const photo_data_viewer_tracker_1 = require("./photo-data-viewer-tracker");
const photo_data_viewer_url_1 = require("./photo-data-viewer-url");
const photo_data_viewer_window_state_1 = require("./photo-data-viewer-window-state");
async function launchPhotoDataViewer(ipcParams) {
    const photo = ipcParams.photo;
    photo_data_viewer_logger_1.photoDataViewerLogger.info(`Open Window for ${photo.path}`);
    const windowState = photo_data_viewer_window_state_1.PhotoDataViewerWindowState.get();
    const browserWindow = new electron_1.BrowserWindow({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        title: `${photo.name} - EXIF Map Visualizer`,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    browserWindow.webContents.setWindowOpenHandler(({ url }) => {
        const urlForAnalytics = modifyUrlForAnalyticsIfNeeded(url);
        (0, open_url_1.openUrl)(url, 'somewhere', 'Photo Data Viewer', urlForAnalytics);
        return { action: 'deny' };
    });
    const bounds = browserWindow?.getBounds?.();
    (0, photo_data_viewer_logger_1.logWindowBounds)(bounds, photo);
    (0, photo_data_viewer_tracker_1.trackOpeningPhotoDataViewer)(bounds);
    photo_data_viewer_window_state_1.PhotoDataViewerWindowState.manage({ browserWindow, photo });
    const photoDataViewerUrl = (0, photo_data_viewer_url_1.createPhotoDataViewerUrl)(photo);
    await browserWindow.loadURL(photoDataViewerUrl);
    browserWindow.show();
}
exports.launchPhotoDataViewer = launchPhotoDataViewer;
function modifyUrlForAnalyticsIfNeeded(originalUrl) {
    const googleMapsUrlPattern1 = 'https://maps.google.com/';
    const googleMapsUrlPattern2 = 'https://www.google.com/maps/';
    let urlForAnalytics = originalUrl;
    if (originalUrl.includes(googleMapsUrlPattern1)) {
        urlForAnalytics = `URL including ${googleMapsUrlPattern1}`; // Not to send query parameters containing latitude and longitude
    }
    else if (originalUrl.includes(googleMapsUrlPattern2)) {
        urlForAnalytics = `URL including ${googleMapsUrlPattern2}`; // Not to send query parameters containing latitude and longitude
    }
    return urlForAnalytics;
}
//# sourceMappingURL=launch-photo-data-viewer.js.map