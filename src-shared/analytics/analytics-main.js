"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsMain = void 0;
const amplitude_analytics_browser_ipc_1 = require("./ipc/amplitude-analytics-browser-ipc");
const mixpanel_browser_ipc_1 = require("./ipc/mixpanel-browser-ipc");
const universal_analytics_ipc_1 = require("./ipc/universal-analytics-ipc");
const universal_analytics_wrapper_1 = require("./library-wrapper/universal-analytics-wrapper");
class AnalyticsMain {
    constructor() {
        universal_analytics_wrapper_1.UniversalAnalyticsWrapper.initialize();
        universal_analytics_ipc_1.UniversalAnalyticsIpcMain.configureReceivingIpcFromRenderer();
    }
    trackEvent(category, action, label, value) {
        universal_analytics_wrapper_1.UniversalAnalyticsWrapper.trackEvent(category, action, label, value);
        amplitude_analytics_browser_ipc_1.AmplitudeAnalyticsBrowserIpcMain.sendEventToRenderer(category, action, label, value);
        mixpanel_browser_ipc_1.MixpanelBrowserIpcMain.sendEventToRenderer(category, action, label, value);
    }
}
exports.AnalyticsMain = AnalyticsMain;
//# sourceMappingURL=analytics-main.js.map