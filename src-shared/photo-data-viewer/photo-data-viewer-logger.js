"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWindowBounds = exports.photoDataViewerLogger = void 0;
const create_prepended_logger_1 = require("../log/create-prepended-logger");
exports.photoDataViewerLogger = (0, create_prepended_logger_1.createPrependedLogger)('[Photo Data Viewer]');
function logWindowBounds(bounds, photo) {
    if (!bounds) {
        return;
    }
    const { x, y, width, height } = bounds;
    exports.photoDataViewerLogger.info(`Window Bounds { x: ${x}, y: ${y}, width: ${width}, height: ${height} } for ${photo?.path}`);
}
exports.logWindowBounds = logWindowBounds;
//# sourceMappingURL=photo-data-viewer-logger.js.map