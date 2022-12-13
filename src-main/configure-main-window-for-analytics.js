"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMainWindowForAnalytics = void 0;
const universal_analytics_wrapper_1 = require("../src-shared/analytics/library-wrapper/universal-analytics-wrapper");
const amplitude_analytics_browser_ipc_1 = require("../src-shared/analytics/ipc/amplitude-analytics-browser-ipc");
const mixpanel_browser_ipc_1 = require("../src-shared/analytics/ipc/mixpanel-browser-ipc");
function configureMainWindowForAnalytics(mainWindow) {
    const userAgent = mainWindow.webContents.userAgent;
    universal_analytics_wrapper_1.UniversalAnalyticsWrapper.setUserAgent(userAgent);
    amplitude_analytics_browser_ipc_1.AmplitudeAnalyticsBrowserIpcMain.setMainWindow(mainWindow);
    mixpanel_browser_ipc_1.MixpanelBrowserIpcMain.setMainWindow(mainWindow);
}
exports.configureMainWindowForAnalytics = configureMainWindowForAnalytics;
//# sourceMappingURL=configure-main-window-for-analytics.js.map