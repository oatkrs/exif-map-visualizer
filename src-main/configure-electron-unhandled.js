"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electronUnhandled = require("electron-unhandled");
const logger_1 = require("../src-shared/log/logger");
electronUnhandled({
    logger: error => {
        logger_1.Logger.error(`error.name: ${error.name}, error.message: ${error.message}, error.stack: ${error.stack}`, error);
    },
    showDialog: true,
    // TODO: add reportButton???
});
//# sourceMappingURL=configure-electron-unhandled.js.map