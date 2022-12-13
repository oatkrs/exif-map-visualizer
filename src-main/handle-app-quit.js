"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAppQuit = void 0;
const electron_1 = require("electron");
const logger_1 = require("../src-shared/log/logger");
function handleAppQuit() {
    logger_1.Logger.info('Quitting application.');
    // Clear the session's HTTP cache when the app quits so that the cache folder size stays small.
    // An example of the cache is the map because the cache files are created after zooming in/out the map.
    // Cache folder location on Windows: C:\Users\%USERNAME%\AppData\Roaming\EXIF Map Visualizer\Cache
    // ------------------------------------------------------
    // Before clearing it for the first time on October 2022,
    // the cache folder size was 434 MB, and the oldest file in the cache folder exists from March 2022.
    // It seems like some portion of the cache is no longer used but still exists.
    electron_1.session.defaultSession.clearCache();
}
exports.handleAppQuit = handleAppQuit;
//# sourceMappingURL=handle-app-quit.js.map