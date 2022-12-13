"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataStorage = void 0;
const logger_1 = require("../log/logger");
const require_from_main_process_1 = require("../require/require-from-main-process");
class UserDataStorage {
    static read(storagePath) {
        this.log(storagePath, 'Attempt to read');
        const { filePath, key } = this.getFilePathAndKey(storagePath);
        if (!this.fsExtra.existsSync(filePath))
            throw new Error(`File for ${key} does not exist in ${filePath}`);
        const fileContent = this.fsExtra.readFileSync(filePath, 'utf8');
        const jsonObject = JSON.parse(fileContent);
        const value = jsonObject[key];
        this.log(storagePath, `Read result is "${value}"`);
        return value;
    }
    static readOrDefault(storagePath, defaultValue) {
        let result;
        try {
            result = UserDataStorage.read(storagePath);
        }
        catch (error) {
            this.log(storagePath, `Failed to read. Instead, "${defaultValue}" will be the read result. Error Message: ${error.toString()}`);
            result = defaultValue;
        }
        return result;
    }
    static write(storagePath, value) {
        this.log(storagePath, `Attempt to write "${value}"`);
        const { filePath, key } = this.getFilePathAndKey(storagePath);
        const jsonObject = {};
        jsonObject[key] = value;
        const fileContent = JSON.stringify(jsonObject);
        this.fsExtra.ensureFileSync(filePath);
        this.fsExtra.writeFileSync(filePath, fileContent);
        this.log(storagePath, `Finished writing "${value}"`);
    }
    static getFilePath(storagePath) {
        const { filePath } = this.getFilePathAndKey(storagePath);
        return filePath;
    }
    static getFilePathAndKey(storagePath) {
        if (!storagePath || !storagePath.length) {
            throw new Error('storagePath needs to be a string array which contains at least 1 element.');
        }
        const copiedStoragePath = Array.from(storagePath);
        const lastElement = copiedStoragePath.pop();
        const filePath = this.path.join(this.storageRootPath, ...copiedStoragePath, `${lastElement}.json`);
        return { filePath: filePath, key: lastElement };
    }
    static log(storagePath, message) {
        logger_1.Logger.debug(`[UserDataStorage] Path: "${storagePath.join(',')}" | ${message}`);
    }
}
exports.UserDataStorage = UserDataStorage;
UserDataStorage.fsExtra = require_from_main_process_1.RequireFromMainProcess.fsExtra;
UserDataStorage.path = require_from_main_process_1.RequireFromMainProcess.path;
UserDataStorage.userDataPath = require_from_main_process_1.RequireFromMainProcess.electron.app.getPath('userData');
// 'EXIFMapVisualizerStorage' is named like this to be unique without collision in 'userData' directory.
UserDataStorage.subDirForStorage = 'EXIFMapVisualizerStorage';
UserDataStorage.storageRootPath = UserDataStorage.path.join(UserDataStorage.userDataPath, UserDataStorage.subDirForStorage);
//# sourceMappingURL=user-data-storage.js.map