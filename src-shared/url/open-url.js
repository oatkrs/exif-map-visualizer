"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openUrl = void 0;
const electron_1 = require("electron");
const analytics_1 = require("../analytics/analytics");
const logger_1 = require("../log/logger");
function openUrl(url, urlDescription, from, urlForAnalytics = url) {
    // noinspection JSIgnoredPromiseFromCall
    electron_1.shell.openExternal(url);
    logger_1.Logger.info(`[${from}] Opened URL for ${urlDescription} - ${url}`);
    analytics_1.Analytics.trackEvent(`Opened URL`, `Opened URL`, `[${from}] Opened URL for ${urlDescription}`, urlForAnalytics);
}
exports.openUrl = openUrl;
//# sourceMappingURL=open-url.js.map