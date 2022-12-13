"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openContainingFolder = exports.openWithAssociatedApp = void 0;
const child_process = require("child_process");
const os = require("os");
const pathModule = require("path");
const logger_1 = require("../log/logger");
const max_file_path_length_on_windows_1 = require("../max-file-path-length-on-windows/max-file-path-length-on-windows");
const command_string_1 = require("./command-string");
function openWithAssociatedApp(path) {
    const fileOrFolderName = pathModule.basename(path);
    const command = command_string_1.CommandString.toOpenWithAssociatedApp(path);
    if (command) {
        child_process.spawn(command, [], { shell: true });
        logger_1.Logger.info(`Issued a command: ${command}`);
        logger_1.Logger.info(`Opened with associated app: ${path}`);
        if ((0, max_file_path_length_on_windows_1.isFilePathTooLongOnWindows)(path)) {
            logger_1.Logger.warn(`Opening ${fileOrFolderName} with its associated app might not work because the length of the file path exceeds the maximum on Windows.\n`
                + `Maximum: ${max_file_path_length_on_windows_1.maxFilePathLengthOnWindows} characters\n`
                + `File path: ${path.length} characters`);
        }
    }
    else {
        logger_1.Logger.warn(`Opening ${fileOrFolderName} with its associated app is not supported on this platform: ${os.platform()}, file path: ${path}`);
    }
}
exports.openWithAssociatedApp = openWithAssociatedApp;
function openContainingFolder(path) {
    const fileOrFolderName = pathModule.basename(path);
    const command = command_string_1.CommandString.toOpenContainingFolder(path);
    if (command) {
        child_process.spawn(command, [], { shell: true });
        logger_1.Logger.info(`Issued a command: ${command}`);
        logger_1.Logger.info(`Opened the containing folder of "${path}"`);
        if ((0, max_file_path_length_on_windows_1.isFilePathTooLongOnWindows)(path)) {
            logger_1.Logger.warn(`Opening the containing folder of ${fileOrFolderName} might not work because the length of the file path exceeds the maximum on Windows.\n`
                + `Maximum: ${max_file_path_length_on_windows_1.maxFilePathLengthOnWindows} characters\n`
                + `File path: ${path.length} characters`);
        }
    }
    else {
        logger_1.Logger.warn(`Opening the containing folder of ${fileOrFolderName} is not supported on this platform: ${os.platform()}, file path: ${path}`);
    }
}
exports.openContainingFolder = openContainingFolder;
//# sourceMappingURL=command.js.map