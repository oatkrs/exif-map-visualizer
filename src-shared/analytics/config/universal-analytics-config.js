"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalAnalyticsConfig = void 0;
const dev_or_prod_1 = require("../../dev-or-prod/dev-or-prod");
const is_prerelease_version_1 = require("../../version/is-prerelease-version");
class UniversalAnalyticsTrackingId {
}
UniversalAnalyticsTrackingId.dev = 'UA-143091961-1';
UniversalAnalyticsTrackingId.prod = 'UA-143091961-2';
class UniversalAnalyticsConfig {
    static get trackingId() {
        if (dev_or_prod_1.DevOrProd.isDev)
            return UniversalAnalyticsTrackingId.dev;
        return (0, is_prerelease_version_1.isPrereleaseVersion)()
            ? UniversalAnalyticsTrackingId.dev
            : UniversalAnalyticsTrackingId.prod;
    }
}
exports.UniversalAnalyticsConfig = UniversalAnalyticsConfig;
//# sourceMappingURL=universal-analytics-config.js.map