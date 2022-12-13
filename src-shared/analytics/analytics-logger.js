"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordIfEventNameLengthExceedsLimit = exports.analyticsLogger = void 0;
const create_prepended_logger_1 = require("../log/create-prepended-logger");
const analytics_config_1 = require("./config/analytics-config");
exports.analyticsLogger = (0, create_prepended_logger_1.createPrependedLogger)('[Analytics]');
function recordIfEventNameLengthExceedsLimit(analytics, category, action, label, value) {
    const eventName = action;
    if (eventName.length > 40) {
        exports.analyticsLogger.warn(`Event name length exceeds the limit (40 characters) of Google Analytics 4.`);
        exports.analyticsLogger.warn(`Event Name (Action): ${eventName}, Category: ${category}, Label: ${label}, Value: ${value}`);
        analytics.trackEvent('Event Name Length Exceeds GA4 Limit', 'Event Name Length Exceeds GA4 Limit', `Event Name: ${eventName}, Category: ${category}, Label: ${label}, Value: ${value}`, `User ID: ${analytics_config_1.AnalyticsConfig.userId}`);
    }
}
exports.recordIfEventNameLengthExceedsLimit = recordIfEventNameLengthExceedsLimit;
//# sourceMappingURL=analytics-logger.js.map