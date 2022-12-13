"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
const environment_detector_1 = require("../environment/environment-detector");
const process_identifier_1 = require("../process/process-identifier");
const analytics_logger_1 = require("./analytics-logger");
const analytics_main_1 = require("./analytics-main");
const analytics_renderer_1 = require("./analytics-renderer");
let analytics;
function initializeAnalytics() {
    if (environment_detector_1.EnvironmentDetector.isUnitTest)
        return;
    if (process_identifier_1.ProcessIdentifier.isElectronMain) {
        analytics = new analytics_main_1.AnalyticsMain();
    }
    else {
        analytics = new analytics_renderer_1.AnalyticsRenderer();
    }
}
class Analytics {
    static trackEvent(category, action, label, value) {
        if (environment_detector_1.EnvironmentDetector.isUnitTest)
            return;
        analytics.trackEvent(category, action, label, value);
        (0, analytics_logger_1.recordIfEventNameLengthExceedsLimit)(analytics, category, action, label, value);
    }
}
exports.Analytics = Analytics;
initializeAnalytics();
//# sourceMappingURL=analytics.js.map