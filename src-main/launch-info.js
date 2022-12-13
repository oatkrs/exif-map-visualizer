"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchInfo = void 0;
const moment = require("moment-timezone");
const moment_diff_1 = require("../src-shared/date-time/moment-diff");
const now_1 = require("../src-shared/date-time/now");
const user_data_stroage_path_1 = require("../src-shared/user-data-storage/user-data-stroage-path");
const user_data_storage_1 = require("../src-shared/user-data-storage/user-data-storage");
const isNaturalNumber = require('is-natural-number');
class LaunchInfo {
    static get isFirstLaunch() {
        return this.launchCount === 1;
    }
    static initialize() {
        this.initializeLastLaunchDateTime();
        this.initializeFirstLaunchDateTimeAndPeriodOfUse();
        this.initializeLaunchCount();
    }
    static initializeLastLaunchDateTime() {
        this.lastLaunchDateTime = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.History.LastLaunchDateTime, '"This is the first launch."');
        user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.History.LastLaunchDateTime, this.currentLaunchDateTime);
    }
    static initializeFirstLaunchDateTimeAndPeriodOfUse() {
        let firstLaunchDateTime;
        try {
            firstLaunchDateTime = user_data_storage_1.UserDataStorage.read(user_data_stroage_path_1.UserDataStoragePath.History.FirstLaunchDateTime);
        }
        catch {
            firstLaunchDateTime = this.currentLaunchDateTime;
            user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.History.FirstLaunchDateTime, firstLaunchDateTime);
        }
        this.firstLaunchDateTime = firstLaunchDateTime;
        const args = { start: moment(firstLaunchDateTime), end: moment(this.currentLaunchDateTime) };
        const diff = (0, moment_diff_1.getMomentDiff)(args);
        this.periodOfUse = `${diff.years} years ${diff.months} months ${diff.days} days ${diff.hours} hours ${diff.minutes} minutes ${diff.seconds} seconds`;
        this.periodOfUseAsIso8601 = (0, moment_diff_1.getMomentDiffAsIso8601)(args);
    }
    static initializeLaunchCount() {
        const prevLaunchCountStr = user_data_storage_1.UserDataStorage.readOrDefault(user_data_stroage_path_1.UserDataStoragePath.History.LaunchCount, '0');
        const maybePrevLaunchCount = Number(prevLaunchCountStr);
        const prevLaunchCount = isNaturalNumber(maybePrevLaunchCount, { includeZero: true }) ? maybePrevLaunchCount : 0;
        this.launchCount = prevLaunchCount + 1;
        user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.History.LaunchCount, this.launchCount.toString());
    }
}
exports.LaunchInfo = LaunchInfo;
LaunchInfo.currentLaunchDateTime = now_1.Now.extendedFormat;
LaunchInfo.initialize();
//# sourceMappingURL=launch-info.js.map