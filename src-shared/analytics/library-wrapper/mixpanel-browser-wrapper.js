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
exports.MixpanelBrowserWrapper = void 0;
const create_prepended_logger_1 = require("../../log/create-prepended-logger");
const analytics_config_1 = require("../config/analytics-config");
const mixpanel_config_1 = require("../config/mixpanel-config");
const library_wrapper_decorator_1 = require("./library-wrapper-decorator");
const mixpanelLogger = (0, create_prepended_logger_1.createPrependedLogger)('[Mixpanel]');
class MixpanelBrowserWrapper {
    static initialize() {
        const projectToken = mixpanel_config_1.MixpanelConfig.projectToken;
        const distinctId = analytics_config_1.AnalyticsConfig.userId;
        mixpanelLogger.info(`Project Token: ${projectToken}`);
        mixpanelLogger.info(`Distinct ID: ${distinctId}`);
        // Avoid import at the top of the file to avoid loading mixpanel-browser in the main process.
        // As of Oct 2022, there is no problem in loading mixpanel-browser in the main process,
        // but this is a preventative measure because mixpanel-browser is designed to be used in web browsers.
        this.mixpanel = require('mixpanel-browser');
        this.mixpanel.init(projectToken);
        this.mixpanel.identify(distinctId);
        this.isInitialized = true;
    }
    static trackEvent(category, action, label, value) {
        if (!this.isInitialized) {
            mixpanelLogger.warn('MixpanelBrowserWrapper::initialize needs to be called before calling MixpanelBrowserWrapper::trackEvent');
            return;
        }
        this.mixpanel.track(action, {
            category: category,
            label: label,
            value: value,
        });
    }
}
MixpanelBrowserWrapper.isInitialized = false;
__decorate([
    (0, library_wrapper_decorator_1.AnalyticsLibraryWrapperInitialize)(mixpanelLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MixpanelBrowserWrapper, "initialize", null);
__decorate([
    (0, library_wrapper_decorator_1.AnalyticsLibraryWrapperTrackEvent)(mixpanelLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], MixpanelBrowserWrapper, "trackEvent", null);
exports.MixpanelBrowserWrapper = MixpanelBrowserWrapper;
//# sourceMappingURL=mixpanel-browser-wrapper.js.map