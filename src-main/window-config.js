"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordWindowState = exports.createMainWindowState = void 0;
const windowStateKeeper = require("electron-window-state");
const analytics_1 = require("../src-shared/analytics/analytics");
const logger_1 = require("../src-shared/log/logger");
const launch_info_1 = require("./launch-info");
const defaultConfig = {
    defaultWidth: 1000,
    defaultHeight: 800
};
let mainWindowState;
function createMainWindowState() {
    mainWindowState = windowStateKeeper(defaultConfig); // Load the previous main window state with fallback to defaults
    return mainWindowState;
}
exports.createMainWindowState = createMainWindowState;
function recordWindowState() {
    const isFirstLaunch = launch_info_1.LaunchInfo.isFirstLaunch;
    if (isFirstLaunch) {
        // eslint-disable-next-line max-len
        analytics_1.Analytics.trackEvent('Main Window at App Launch', 'Main Window: isFirstLaunch', `isFirstLaunch: ${isFirstLaunch}, so width and height are defaulted to ${defaultConfig.defaultWidth}x${defaultConfig.defaultHeight}`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (1st time)', 'Main Window: Dimensions', `Window Dimensions: ${mainWindowState.width}x${mainWindowState.height}`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (1st time)', 'Main Window: XY coordinates', `XY coordinates: (${mainWindowState.x}, ${mainWindowState.y})`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (1st time)', 'Main Window: isFullScreen', `isFullScreen: ${mainWindowState.isFullScreen}`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (1st time)', 'Main Window: isMaximized', `isMaximized: ${mainWindowState.isMaximized}`);
        logger_1.Logger.info(`[Main Window at App Launch] This is the first launch, so width and height are defaulted to ${defaultConfig.defaultWidth}x${defaultConfig.defaultHeight}`);
    }
    else {
        analytics_1.Analytics.trackEvent('Main Window at App Launch', 'Main Window: isFirstLaunch', `isFirstLaunch: ${isFirstLaunch}`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (>= 2nd time)', 'Main Window: Dimensions', `Window Dimensions: ${mainWindowState.width}x${mainWindowState.height}`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (>= 2nd time)', 'Main Window: XY coordinates', `XY coordinates: (${mainWindowState.x}, ${mainWindowState.y})`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (>= 2nd time)', 'Main Window: isFullScreen', `isFullScreen: ${mainWindowState.isFullScreen}`);
        analytics_1.Analytics.trackEvent('Main Window at App Launch (>= 2nd time)', 'Main Window: isMaximized', `isMaximized: ${mainWindowState.isMaximized}`);
        logger_1.Logger.info(`[Main Window at App Launch] This is not the first launch, so width and height are the ones previously saved.`);
    }
    logger_1.Logger.info(`[Main Window at App Launch] Window Dimensions: ${mainWindowState.width}x${mainWindowState.height}`);
    logger_1.Logger.info(`[Main Window at App Launch] XY coordinates: (${mainWindowState.x}, ${mainWindowState.y})`);
    logger_1.Logger.info(`[Main Window at App Launch] isFullScreen: ${mainWindowState.isFullScreen}`);
    logger_1.Logger.info(`[Main Window at App Launch] isMaximized: ${mainWindowState.isMaximized}`);
}
exports.recordWindowState = recordWindowState;
//# sourceMappingURL=window-config.js.map