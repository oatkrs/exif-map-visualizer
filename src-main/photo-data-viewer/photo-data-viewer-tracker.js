"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackClosingPhotoDataViewer = exports.trackOpeningPhotoDataViewer = void 0;
const analytics_1 = require("../../src-shared/analytics/analytics");
function trackOpeningPhotoDataViewer(bounds) {
    if (!bounds) {
        return;
    }
    const { x, y, width, height } = bounds;
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Opened`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Opened Position X`, `Position X: ${x}`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Opened Position Y`, `Position Y: ${y}`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Opened Width`, `Width: ${width}`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Opened Height`, `Height: ${height}`);
}
exports.trackOpeningPhotoDataViewer = trackOpeningPhotoDataViewer;
function trackClosingPhotoDataViewer(bounds) {
    // Note that browserWindow APIs shouldn't be used in this function
    // because they might not be available due to the behavior that
    // browserWindow will be destructed sometime after closing the window.
    if (!bounds) {
        return;
    }
    const { x, y, width, height } = bounds;
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Closed`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Closed Position X`, `Position X: ${x}`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Closed Position Y`, `Position Y: ${y}`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Closed Width`, `Width: ${width}`);
    analytics_1.Analytics.trackEvent('Photo Data Viewer', `[PDV] Window Closed Height`, `Height: ${height}`);
}
exports.trackClosingPhotoDataViewer = trackClosingPhotoDataViewer;
//# sourceMappingURL=photo-data-viewer-tracker.js.map