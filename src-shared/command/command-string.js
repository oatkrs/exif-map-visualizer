"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandString = void 0;
const os = require("os");
class CommandString {
    static toOpenWithAssociatedApp(path) {
        switch (os.platform()) {
            case 'win32':
                return `explorer "${path}"`;
            case 'darwin':
                return `open "${path}"`;
            case 'linux':
                return `xdg-open "${path}"`;
            default:
                return null;
        }
    }
    static toOpenContainingFolder(path) {
        switch (os.platform()) {
            case 'win32':
                return `explorer /select,"${path}"`;
            case 'darwin':
                return `open -R "${path}"`;
            case 'linux':
                return `nautilus "${path}"`;
            default:
                return null;
        }
    }
}
exports.CommandString = CommandString;
//# sourceMappingURL=command-string.js.map