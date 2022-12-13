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
exports.AmplitudeAnalyticsBrowserWrapper = void 0;
const create_prepended_logger_1 = require("../../log/create-prepended-logger");
const amplitude_config_1 = require("../config/amplitude-config");
const analytics_config_1 = require("../config/analytics-config");
const library_wrapper_decorator_1 = require("./library-wrapper-decorator");
const amplitudeLogger = (0, create_prepended_logger_1.createPrependedLogger)('[Amplitude]');
class AmplitudeAnalyticsBrowserWrapper {
    static initialize() {
        const apiKey = amplitude_config_1.AmplitudeConfig.apiKey;
        const userId = analytics_config_1.AnalyticsConfig.userId;
        const deviceId = userId; // Use the same ID for User ID and Device ID because User ID is generated per device.
        amplitudeLogger.info(`API Key: ${apiKey}`);
        amplitudeLogger.info(`User ID: ${userId}`);
        amplitudeLogger.info(`Device ID: ${deviceId}`);
        // Avoid import at the top of the file to avoid loading @amplitude/analytics-browser in the main process.
        // As of Oct 2022, there is no problem in loading @amplitude/analytics-browser in the main process,
        // but this is a preventative measure because @amplitude/analytics-browser is designed to be used in web browsers.
        this.amplitude = require('@amplitude/analytics-browser');
        this.amplitude.init(apiKey, userId);
        this.amplitude.setDeviceId(deviceId);
        this.isInitialized = true;
    }
    static trackEvent(category, action, label, value) {
        if (!this.isInitialized) {
            amplitudeLogger.warn('AmplitudeAnalyticsBrowserWrapper::initialize needs to be called before calling AmplitudeAnalyticsBrowserWrapper::trackEvent');
            return;
        }
        this.amplitude.track(action, {
            category: category,
            label: label,
            value: value,
        });
    }
}
AmplitudeAnalyticsBrowserWrapper.isInitialized = false;
__decorate([
    (0, library_wrapper_decorator_1.AnalyticsLibraryWrapperInitialize)(amplitudeLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AmplitudeAnalyticsBrowserWrapper, "initialize", null);
__decorate([
    (0, library_wrapper_decorator_1.AnalyticsLibraryWrapperTrackEvent)(amplitudeLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], AmplitudeAnalyticsBrowserWrapper, "trackEvent", null);
exports.AmplitudeAnalyticsBrowserWrapper = AmplitudeAnalyticsBrowserWrapper;
//# sourceMappingURL=amplitude-analytics-browser-wrapper.js.map