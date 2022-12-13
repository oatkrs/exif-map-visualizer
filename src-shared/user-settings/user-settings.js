"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserSettingsAndRestartApp = exports.saveUserSetting = exports.getUserSettingsToBeSaved = exports.currentUserSettings = exports.UserSettingsToBeSaved = exports.CurrentUserSettings = void 0;
const date_time_format_1 = require("../date-time/date-time-format");
const logger_1 = require("../log/logger");
const require_from_main_process_1 = require("../require/require-from-main-process");
const user_data_storage_1 = require("../user-data-storage/user-data-storage");
const user_data_stroage_path_1 = require("../user-data-storage/user-data-stroage-path");
const boolean_setting_1 = require("./boolean-setting");
class CurrentUserSettings {
    constructor(showStatusBar, dateFormat, clockSystemFormat) {
        this.showStatusBar = showStatusBar;
        this.dateFormat = dateFormat;
        this.clockSystemFormat = clockSystemFormat;
    }
}
exports.CurrentUserSettings = CurrentUserSettings;
class UserSettingsToBeSaved {
}
exports.UserSettingsToBeSaved = UserSettingsToBeSaved;
const loadShowStatusBar = () => {
    const loadedShowStatusBar = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.UserSettings.ShowStatusBar, boolean_setting_1.BooleanSetting.TrueValue);
    const showStatusBar = boolean_setting_1.BooleanSetting.isSettingValueValid(loadedShowStatusBar)
        ? loadedShowStatusBar
        : boolean_setting_1.BooleanSetting.TrueValue;
    return showStatusBar;
};
const loadDateFormat = () => {
    const loadedDateFormat = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.UserSettings.DateFormat, date_time_format_1.DateTimeFormat.ForUser.DateFormat_Default);
    const isValidFormat = date_time_format_1.DateTimeFormat.ForUser.DateFormat_List.includes(loadedDateFormat);
    const dateFormat = isValidFormat
        ? loadedDateFormat
        : date_time_format_1.DateTimeFormat.ForUser.DateFormat_Default;
    return dateFormat;
};
const loadClockSystemFormat = () => {
    const loadedClockSystemFormat = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.UserSettings.ClockSystemFormat, date_time_format_1.DateTimeFormat.ForUser.ClockSystemFormat_Default);
    const isValidFormat = date_time_format_1.DateTimeFormat.ForUser.ClockSystemFormat_List.includes(loadedClockSystemFormat);
    const clockSystemFormat = isValidFormat
        ? loadedClockSystemFormat
        : date_time_format_1.DateTimeFormat.ForUser.ClockSystemFormat_Default;
    return clockSystemFormat;
};
const loadUserSettings = () => {
    const showStatusBar = loadShowStatusBar();
    const dateFormat = loadDateFormat();
    const clockSystemFormat = loadClockSystemFormat();
    const userSettings = new CurrentUserSettings(showStatusBar, dateFormat, clockSystemFormat);
    logger_1.Logger.info(`Loaded user settings ${JSON.stringify(userSettings)}`);
    return userSettings;
};
exports.currentUserSettings = loadUserSettings();
const getUserSettingsToBeSaved = () => {
    return { ...exports.currentUserSettings };
};
exports.getUserSettingsToBeSaved = getUserSettingsToBeSaved;
function updateCurrentUserSettings(settings) {
    Object.assign(exports.currentUserSettings, settings);
}
const saveUserSetting = (settings) => {
    updateCurrentUserSettings(settings);
    user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.UserSettings.ShowStatusBar, settings.showStatusBar);
    user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.UserSettings.DateFormat, settings.dateFormat);
    user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.UserSettings.ClockSystemFormat, settings.clockSystemFormat);
    logger_1.Logger.info(`Saved user settings ${JSON.stringify(settings)}`);
};
exports.saveUserSetting = saveUserSetting;
const saveUserSettingsAndRestartApp = (settings) => {
    (0, exports.saveUserSetting)(settings);
    logger_1.Logger.info(`User settings are saved, so the application will restart.`);
    require_from_main_process_1.RequireFromMainProcess.electron.app.relaunch();
    require_from_main_process_1.RequireFromMainProcess.electron.app.exit(0);
};
exports.saveUserSettingsAndRestartApp = saveUserSettingsAndRestartApp;
//# sourceMappingURL=user-settings.js.map