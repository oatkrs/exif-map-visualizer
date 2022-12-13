"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhotoDataViewerUrl = void 0;
const user_settings_1 = require("../../src-shared/user-settings/user-settings");
const photo_data_viewer_server_config_1 = require("./photo-data-viewer-server-config");
function createPhotoDataViewerUrl(photo) {
    const searchParamsObj = {
        photoPath: photo.path,
        dateFormat: user_settings_1.currentUserSettings.dateFormat,
        clockSystemFormat: user_settings_1.currentUserSettings.clockSystemFormat,
    };
    const serverUrl = (0, photo_data_viewer_server_config_1.getPhotoDataViewerServerUrl)();
    const photoDataViewerUrl = new URL(serverUrl);
    photoDataViewerUrl.search = new URLSearchParams(searchParamsObj).toString();
    return photoDataViewerUrl.href;
}
exports.createPhotoDataViewerUrl = createPhotoDataViewerUrl;
//# sourceMappingURL=photo-data-viewer-url.js.map