"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsLibraryWrapperTrackEvent = exports.AnalyticsLibraryWrapperSetUserAgent = exports.AnalyticsLibraryWrapperInitialize = void 0;
const catch_1 = require("../../decorator/catch");
const AnalyticsLibraryWrapperInitialize = (logger) => {
    return (0, catch_1.DefaultCatch)((error, ctx) => {
        logger.error('An unhandled exception occurred in analytics initialization.');
        logger.error(`error: ${error}`, error);
    });
};
exports.AnalyticsLibraryWrapperInitialize = AnalyticsLibraryWrapperInitialize;
const AnalyticsLibraryWrapperSetUserAgent = (logger) => {
    return (0, catch_1.DefaultCatch)((error, ctx, userAgent) => {
        logger.warn('An unhandled exception occurred in analytics setUserAgent.');
        logger.warn(`error: ${error}`, error);
        logger.warn(`userAgent: ${userAgent}`);
    });
};
exports.AnalyticsLibraryWrapperSetUserAgent = AnalyticsLibraryWrapperSetUserAgent;
const AnalyticsLibraryWrapperTrackEvent = (logger) => {
    return (0, catch_1.DefaultCatch)((error, ctx, category, action, label, value) => {
        logger.warn('An unhandled exception occurred in analytics trackEvent.');
        logger.warn(`error: ${error}`, error);
        logger.warn(`category: ${category}, action: ${action}, label: ${label}, value: ${value}`);
    });
};
exports.AnalyticsLibraryWrapperTrackEvent = AnalyticsLibraryWrapperTrackEvent;
//# sourceMappingURL=library-wrapper-decorator.js.map