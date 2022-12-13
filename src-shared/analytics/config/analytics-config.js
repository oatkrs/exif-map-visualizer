"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsConfig = void 0;
const uuid_1 = require("uuid");
const user_data_storage_1 = require("../../user-data-storage/user-data-storage");
const user_data_stroage_path_1 = require("../../user-data-storage/user-data-stroage-path");
class AnalyticsConfig {
    static get userId() {
        let userId;
        try {
            userId = user_data_storage_1.UserDataStorage.read(user_data_stroage_path_1.UserDataStoragePath.Analytics.UserId);
        }
        catch {
            userId = (0, uuid_1.v4)();
            user_data_storage_1.UserDataStorage.write(user_data_stroage_path_1.UserDataStoragePath.Analytics.UserId, userId);
        }
        return userId;
    }
}
exports.AnalyticsConfig = AnalyticsConfig;
//# sourceMappingURL=analytics-config.js.map