"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalAnalyticsWrapper = void 0;
const create_prepended_logger_1 = require("../../log/create-prepended-logger");
const analytics_config_1 = require("../config/analytics-config");
const universal_analytics_config_1 = require("../config/universal-analytics-config");
const library_wrapper_decorator_1 = require("./library-wrapper-decorator");
const uaLogger = (0, create_prepended_logger_1.createPrependedLogger)('[Universal Analytics]');
class UniversalAnalyticsWrapper {
    static initialize() {
        const trackingId = universal_analytics_config_1.UniversalAnalyticsConfig.trackingId;
        const userId = analytics_config_1.AnalyticsConfig.userId;
        uaLogger.info(`Tracking ID: ${trackingId}`);
        uaLogger.info(`User ID: ${userId}`);
        const ua = require('universal-analytics');
        this.visitor = ua(trackingId, userId);
    }
    static setUserAgent(userAgent) {
        if (!this.visitor) {
            uaLogger.error('UniversalAnalyticsWrapper::initialize needs to be called before calling setUserAgent.');
            return;
        }
        this.visitor.set('userAgentOverride', userAgent);
        uaLogger.info(`User Agent for Universal Analytics is "${userAgent}"`);
        this.isUserAgentSet = true;
    }
    static trackEvent(category, action, label, value) {
        if (!this.isUserAgentSet) {
            uaLogger.warn('User Agent needs to be set before calling Analytics.trackEvent');
            return;
        }
        this.visitor
            .event({
            ec: category,
            ea: action,
            el: label,
            ev: value,
        })
            .send();
    }
}
UniversalAnalyticsWrapper.isUserAgentSet = false;
__decorate([
    (0, library_wrapper_decorator_1.AnalyticsLibraryWrapperInitialize)(uaLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UniversalAnalyticsWrapper, "initialize", null);
__decorate([
    (0, library_wrapper_decorator_1.AnalyticsLibraryWrapperSetUserAgent)(uaLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UniversalAnalyticsWrapper, "setUserAgent", null);
__decorate([
    (0, library_wrapper_decorator_1.AnalyticsLibraryWrapperTrackEvent)(uaLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], UniversalAnalyticsWrapper, "trackEvent", null);
exports.UniversalAnalyticsWrapper = UniversalAnalyticsWrapper;
//# sourceMappingURL=universal-analytics-wrapper.js.map