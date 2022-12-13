"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixpanelBrowserIpcRenderer = exports.MixpanelBrowserIpcMain = void 0;
const proxy_require_1 = require("../../require/proxy-require");
const mixpanel_browser_wrapper_1 = require("../library-wrapper/mixpanel-browser-wrapper");
class MixpanelBrowserIpcChannelName {
}
MixpanelBrowserIpcChannelName.trackEvent = 'mixpanel-browser-track-event';
class MixpanelBrowserIpcMain {
    static setMainWindow(browserWindow) {
        this.mainWindow = browserWindow;
    }
    static sendEventToRenderer(category, action, label, value) {
        this.mainWindow.webContents.send(MixpanelBrowserIpcChannelName.trackEvent, category, action, label, value);
    }
}
exports.MixpanelBrowserIpcMain = MixpanelBrowserIpcMain;
class MixpanelBrowserIpcRenderer {
    static configureReceivingIpcFromMain() {
        this.ipcRenderer.on(MixpanelBrowserIpcChannelName.trackEvent, (event, category, action, label, value) => {
            mixpanel_browser_wrapper_1.MixpanelBrowserWrapper.trackEvent(category, action, label, value);
        });
    }
}
exports.MixpanelBrowserIpcRenderer = MixpanelBrowserIpcRenderer;
MixpanelBrowserIpcRenderer.ipcRenderer = proxy_require_1.ProxyRequire.electron.ipcRenderer;
//# sourceMappingURL=mixpanel-browser-ipc.js.map