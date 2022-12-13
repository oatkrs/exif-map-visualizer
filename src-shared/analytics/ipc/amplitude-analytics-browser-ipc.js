"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmplitudeAnalyticsBrowserIpcRenderer = exports.AmplitudeAnalyticsBrowserIpcMain = void 0;
const proxy_require_1 = require("../../require/proxy-require");
const amplitude_analytics_browser_wrapper_1 = require("../library-wrapper/amplitude-analytics-browser-wrapper");
class AmplitudeAnalyticsBrowserIpcChannelName {
}
AmplitudeAnalyticsBrowserIpcChannelName.trackEvent = 'amplitude-analytics-browser-track-event';
class AmplitudeAnalyticsBrowserIpcMain {
    static setMainWindow(browserWindow) {
        this.mainWindow = browserWindow;
    }
    static sendEventToRenderer(category, action, label, value) {
        this.mainWindow.webContents.send(AmplitudeAnalyticsBrowserIpcChannelName.trackEvent, category, action, label, value);
    }
}
exports.AmplitudeAnalyticsBrowserIpcMain = AmplitudeAnalyticsBrowserIpcMain;
class AmplitudeAnalyticsBrowserIpcRenderer {
    static configureReceivingIpcFromMain() {
        this.ipcRenderer.on(AmplitudeAnalyticsBrowserIpcChannelName.trackEvent, (event, category, action, label, value) => {
            amplitude_analytics_browser_wrapper_1.AmplitudeAnalyticsBrowserWrapper.trackEvent(category, action, label, value);
        });
    }
}
exports.AmplitudeAnalyticsBrowserIpcRenderer = AmplitudeAnalyticsBrowserIpcRenderer;
AmplitudeAnalyticsBrowserIpcRenderer.ipcRenderer = proxy_require_1.ProxyRequire.electron.ipcRenderer;
//# sourceMappingURL=amplitude-analytics-browser-ipc.js.map