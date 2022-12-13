"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoUpdateLogger = void 0;
const logger_1 = require("../../src-shared/log/logger");
// Note that the logger passed to autoUpdater.logger needs to have the following methods:
// { info(), warn(), error() }
// Also, debug() is actually used for logging "updater cache dir" during downloading the new version.
// Implementing these methods is enforced by ElectronUpdaterLoggerInterface.
// See https://www.electron.build/auto-update
class AutoUpdateLogger {
    error(message) {
        const text = this.indicateAutoUpdate(message);
        logger_1.Logger.error(text);
    }
    warn(message) {
        const text = this.indicateAutoUpdate(message);
        logger_1.Logger.warn(text);
    }
    info(message) {
        const text = this.indicateAutoUpdate(message);
        logger_1.Logger.info(text);
    }
    debug(message) {
        const text = this.indicateAutoUpdate(message);
        logger_1.Logger.debug(text);
    }
    // noinspection JSMethodCanBeStatic
    indicateAutoUpdate(text) {
        return `[auto-update] ${text}`;
    }
}
exports.autoUpdateLogger = new AutoUpdateLogger();
//# sourceMappingURL=auto-update-logger.js.map