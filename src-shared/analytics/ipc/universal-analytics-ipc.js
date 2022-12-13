"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalAnalyticsIpcRenderer = exports.UniversalAnalyticsIpcMain = void 0;
const proxy_require_1 = require("../../require/proxy-require");
const universal_analytics_wrapper_1 = require("../library-wrapper/universal-analytics-wrapper");
class UniversalAnalyticsIpcChannelName {
}
UniversalAnalyticsIpcChannelName.trackEvent = 'universal-analytics-track-event';
class UniversalAnalyticsIpcMain {
    static configureReceivingIpcFromRenderer() {
        this.ipcMain.on(UniversalAnalyticsIpcChannelName.trackEvent, (event, category, action, label, value) => {
            universal_analytics_wrapper_1.UniversalAnalyticsWrapper.trackEvent(category, action, label, value);
        });
    }
}
exports.UniversalAnalyticsIpcMain = UniversalAnalyticsIpcMain;
UniversalAnalyticsIpcMain.ipcMain = proxy_require_1.ProxyRequire.electron.ipcMain;
class UniversalAnalyticsIpcRenderer {
    static sendEventToMain(category, action, label, value) {
        this.ipcRenderer.send(UniversalAnalyticsIpcChannelName.trackEvent, category, action, label, value);
    }
}
exports.UniversalAnalyticsIpcRenderer = UniversalAnalyticsIpcRenderer;
UniversalAnalyticsIpcRenderer.ipcRenderer = proxy_require_1.ProxyRequire.electron.ipcRenderer;
//# sourceMappingURL=universal-analytics-ipc.js.map