"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFilePathTooLongOnWindows = exports.maxFilePathLengthOnWindows = void 0;
const os = require("os");
// 259 comes from MAX_PATH (i.e. 260) minus the terminating null character.
// See https://stackoverflow.com/a/1880453/7947548
exports.maxFilePathLengthOnWindows = 259;
function isFilePathTooLongOnWindows(filePath) {
    const isWindows = os.platform() === 'win32';
    return isWindows && filePath.length > exports.maxFilePathLengthOnWindows;
}
exports.isFilePathTooLongOnWindows = isFilePathTooLongOnWindows;
//# sourceMappingURL=max-file-path-length-on-windows.js.map