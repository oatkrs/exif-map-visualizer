"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrereleaseVersion = exports.isRcVersion = exports.isBetaVersion = exports.isAlphaVersion = void 0;
const require_from_main_process_1 = require("../require/require-from-main-process");
const versionStr = require_from_main_process_1.RequireFromMainProcess.electron.app.getVersion();
const includesAlphaInVersionStr = versionStr.toLowerCase().includes('alpha');
function isAlphaVersion() { return includesAlphaInVersionStr; }
exports.isAlphaVersion = isAlphaVersion;
const includesBetaInVersionStr = versionStr.toLowerCase().includes('beta');
function isBetaVersion() { return includesBetaInVersionStr; }
exports.isBetaVersion = isBetaVersion;
const includesRcInVersionStr = versionStr.toLowerCase().includes('rc');
function isRcVersion() { return includesRcInVersionStr; }
exports.isRcVersion = isRcVersion;
function isPrereleaseVersion() {
    return isAlphaVersion() || isBetaVersion() || isRcVersion();
}
exports.isPrereleaseVersion = isPrereleaseVersion;
//# sourceMappingURL=is-prerelease-version.js.map