"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRenderer = void 0;
const amplitude_analytics_browser_ipc_1 = require("./ipc/amplitude-analytics-browser-ipc");
const mixpanel_browser_ipc_1 = require("./ipc/mixpanel-browser-ipc");
const universal_analytics_ipc_1 = require("./ipc/universal-analytics-ipc");
const amplitude_analytics_browser_wrapper_1 = require("./library-wrapper/amplitude-analytics-browser-wrapper");
const mixpanel_browser_wrapper_1 = require("./library-wrapper/mixpanel-browser-wrapper");
class AnalyticsRenderer {
    constructor() {
        amplitude_analytics_browser_wrapper_1.AmplitudeAnalyticsBrowserWrapper.initialize();
        amplitude_analytics_browser_ipc_1.AmplitudeAnalyticsBrowserIpcRenderer.configureReceivingIpcFromMain();
        mixpanel_browser_wrapper_1.MixpanelBrowserWrapper.initialize();
        mixpanel_browser_ipc_1.MixpanelBrowserIpcRenderer.configureReceivingIpcFromMain();
    }
    trackEvent(category, action, label, value) {
        universal_analytics_ipc_1.UniversalAnalyticsIpcRenderer.sendEventToMain(category, action, label, value);
        amplitude_analytics_browser_wrapper_1.AmplitudeAnalyticsBrowserWrapper.trackEvent(category, action, label, value);
        mixpanel_browser_wrapper_1.MixpanelBrowserWrapper.trackEvent(category, action, label, value);
    }
}
exports.AnalyticsRenderer = AnalyticsRenderer;
//# sourceMappingURL=analytics-renderer.js.map