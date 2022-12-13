"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordAtAppLaunch = void 0;
const os = require("os");
const electron_1 = require("electron");
const analytics_1 = require("../src-shared/analytics/analytics");
const date_time_format_1 = require("../src-shared/date-time/date-time-format");
const dev_or_prod_1 = require("../src-shared/dev-or-prod/dev-or-prod");
const logger_1 = require("../src-shared/log/logger");
const user_data_storage_1 = require("../src-shared/user-data-storage/user-data-storage");
const user_data_stroage_path_1 = require("../src-shared/user-data-storage/user-data-stroage-path");
const user_settings_1 = require("../src-shared/user-settings/user-settings");
const launch_info_1 = require("./launch-info");
const window_config_1 = require("./window-config");
const recordAppLaunch = () => {
    analytics_1.Analytics.trackEvent('App Launch', `App Launch`);
};
const recordCurrentLaunchDateTime = () => {
    const currentLaunchDateTime = launch_info_1.LaunchInfo.currentLaunchDateTime;
    analytics_1.Analytics.trackEvent('Launch Info', `Launch Info: Current Launch Date`, `Current Launch Date: ${currentLaunchDateTime}`);
    logger_1.Logger.info(`Current Launch Date: ${currentLaunchDateTime}`);
};
const recordLastLaunchDateTime = () => {
    const lastLaunchDateTime = launch_info_1.LaunchInfo.lastLaunchDateTime;
    analytics_1.Analytics.trackEvent('Launch Info', `Launch Info: Last Launch Date`, `Last Launch Date: ${lastLaunchDateTime}`);
    logger_1.Logger.info(`Last Launch Date: ${lastLaunchDateTime}`);
};
const recordFirstLaunchDateTime = () => {
    const firstLaunchDateTime = launch_info_1.LaunchInfo.firstLaunchDateTime;
    analytics_1.Analytics.trackEvent('Launch Info', `Launch Info: First Launch Date`, `First Launch Date: ${firstLaunchDateTime}`);
    logger_1.Logger.info(`First Launch Date: ${firstLaunchDateTime}`);
};
const recordPeriodOfUse = () => {
    const periodOfUse = launch_info_1.LaunchInfo.periodOfUse;
    analytics_1.Analytics.trackEvent('Launch Info', `Launch Info: Period of Use`, `Period of Use: ${periodOfUse}`);
    logger_1.Logger.info(`Period of Use: ${periodOfUse}`);
    const periodOfUseAsIso8601 = launch_info_1.LaunchInfo.periodOfUseAsIso8601;
    analytics_1.Analytics.trackEvent('Launch Info', `Launch Info: Period of Use (ISO 8601)`, `Period of Use (ISO 8601): ${periodOfUseAsIso8601}`);
    logger_1.Logger.info(`Period of Use (ISO 8601): ${periodOfUseAsIso8601}`);
};
const recordLaunchCount = () => {
    const launchCount = launch_info_1.LaunchInfo.launchCount;
    analytics_1.Analytics.trackEvent('Launch Info', `Launch Info: Launch Count`, `Launch Count: ${launchCount}`);
    logger_1.Logger.info(`Launch Count: ${launchCount}`);
};
const recordAppVer = () => {
    analytics_1.Analytics.trackEvent('App Ver', 'App Ver', `App Ver: ${electron_1.app.getVersion()}`);
    logger_1.Logger.info(`Application Version: ${electron_1.app.getVersion()}`);
};
const recordDevOrProd = () => {
    analytics_1.Analytics.trackEvent('DevOrProd', 'DevOrProd', `DevOrProd: ${dev_or_prod_1.DevOrProd.toString()}`);
    logger_1.Logger.info(`DevOrProd: ${dev_or_prod_1.DevOrProd.toString()}`);
};
const recordOs = () => {
    analytics_1.Analytics.trackEvent('OS Info', 'OS Info', `OS: ${os.platform()}`, `OS Ver: ${os.release()}`);
    logger_1.Logger.info(`OS: ${os.platform()}; OS Ver: ${os.release()}`);
};
const recordDisplays = () => {
    const allDisplays = electron_1.screen.getAllDisplays();
    analytics_1.Analytics.trackEvent('Display', `[Display] Number of Displays`, `Number of Displays: ${allDisplays.length}`);
    logger_1.Logger.info(`[Display] Number of displays: ${allDisplays.length}`);
    allDisplays.forEach((display, index) => {
        analytics_1.Analytics.trackEvent('Display', `[Display] Each Display Info`, `Display ${index + 1}`, `Width: ${display.size.width}, Height: ${display.size.height}`);
        logger_1.Logger.info(`[Display] Display ${index + 1}, Width: ${display.size.width}, Height: ${display.size.height}`);
    });
};
const recordLoadedUserSettings = () => {
    const settings = user_settings_1.currentUserSettings;
    const momentJsFormatString = date_time_format_1.DateTimeFormat.ForUser.getMomentJsFormatString(settings.dateFormat, settings.clockSystemFormat);
    analytics_1.Analytics.trackEvent('Loaded User Settings', `Date Format`, `Date Format: ${settings.dateFormat}`);
    analytics_1.Analytics.trackEvent('Loaded User Settings', `Clock System Format`, `Clock System Format: ${settings.clockSystemFormat}`);
    analytics_1.Analytics.trackEvent('Loaded User Settings', `moment.js Format`, `moment.js Format: ${momentJsFormatString}`);
};
const recordLoadedLeafletLayer = () => {
    const loadedLayerName = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.LeafletMap.SelectedLayer, 'Not Loaded');
    analytics_1.Analytics.trackEvent('Leaflet Map', `[Leaflet Map] Layer at App Launch`, `Layer at App Launch: "${loadedLayerName}"`);
};
const recordAtAppLaunch = () => {
    recordAppLaunch();
    recordCurrentLaunchDateTime();
    recordLastLaunchDateTime();
    recordFirstLaunchDateTime();
    recordPeriodOfUse();
    recordLaunchCount();
    recordAppVer();
    recordDevOrProd();
    recordOs();
    recordDisplays();
    (0, window_config_1.recordWindowState)();
    recordLoadedUserSettings();
    recordLoadedLeafletLayer();
};
exports.recordAtAppLaunch = recordAtAppLaunch;
//# sourceMappingURL=record-at-app-launch.js.map