"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isThumbnailCacheAvailable = exports.createFileForLastModified = exports.getOriginalFilePath = exports.getThumbnailLogFilePath = exports.getThumbnailFilePath = exports.plmThumbnailCacheDir = void 0;
const fs = require("fs");
const os = require("os");
const pathModule = require("path");
const logger_1 = require("../../log/logger");
exports.plmThumbnailCacheDir = pathModule.join(os.homedir(), '.PlmCache');
function getThumbnailIntermediateDirOnWindows(originalFilePath) {
    let intermediateDir;
    if (originalFilePath.includes(':')) { // in a drive (e.g. C drive, like C:\folder\file.heic)
        const originalFilePathWithoutColon = originalFilePath.replace(':', ''); // Convert to C\folder\file.heic
        intermediateDir = `D_${pathModule.dirname(originalFilePathWithoutColon)}`; // Convert to D_C\folder
    }
    else { // in a network (e.g. \\Hostname\folder\file.heic)
        const originalFilePathWithoutLeadingSlashes = originalFilePath.substring(2); // Convert to Hostname\folder\file.heic
        intermediateDir = `H_${pathModule.dirname(originalFilePathWithoutLeadingSlashes)}`; // Convert to H_Hostname\folder
    }
    return intermediateDir;
}
function getThumbnailFilePath(originalFilePath) {
    let intermediateDir;
    if (os.platform() === 'darwin' || os.platform() === 'linux') {
        intermediateDir = pathModule.dirname(originalFilePath);
    }
    else { // on Windows
        intermediateDir = getThumbnailIntermediateDirOnWindows(originalFilePath);
    }
    const thumbnailFileDir = pathModule.join(exports.plmThumbnailCacheDir, intermediateDir);
    const thumbnailFileName = `${pathModule.basename(originalFilePath)}.plm`;
    const thumbnailFilePath = pathModule.join(thumbnailFileDir, `${thumbnailFileName}.jpg`);
    return { thumbnailFileDir, thumbnailFilePath };
}
exports.getThumbnailFilePath = getThumbnailFilePath;
function getThumbnailLogFilePath(originalFilePath) {
    const originalFileName = pathModule.basename(originalFilePath);
    const { thumbnailFileDir } = getThumbnailFilePath(originalFilePath);
    const logFilePath = pathModule.join(thumbnailFileDir, `${originalFileName}.log.json`);
    return logFilePath;
}
exports.getThumbnailLogFilePath = getThumbnailLogFilePath;
function getOriginalFilePath(thumbnailFilePath) {
    // Converting thumbnailFilePath to pathAfterStep2
    // -----------------------------------------------------
    // On Windows, assuming that plmThumbnailCacheDir is "C:\Users\Utkarsh\.PlmCache",
    //                   | Files in a Drive                                                              | Files in a Network
    // thumbnailFilePath | "C:\Users\Utkarsh\.PlmCache\D_C\Users\Utkarsh\Desktop\IMG_100.HEIC.plm.jpg" | "C:\Users\Utkarsh\.PlmCache\H_Hostname\Folder\IMG_100.HEIC.plm.jpg"
    // After step 1      | "\D_C\Users\Utkarsh\Desktop\IMG_100.HEIC.plm.jpg"                            | "\H_Hostname\Folder\IMG_100.HEIC.plm.jpg"
    // After step 2      | "\D_C\Users\Utkarsh\Desktop\IMG_100.HEIC"                                    | "\H_Hostname\Folder\IMG_100.HEIC"
    // ------------------------------------------------------
    // On macOS, assuming that plmThumbnailCacheDir is "/Users/Utkarsh/.PlmCache",
    //                   | Files in Macintosh HD                                                       | Files in Volumes
    // thumbnailFilePath | "/Users/Utkarsh/.PlmCache/Users/Utkarsh/Desktop/IMG_100.HEIC.plm.jpg"     | "/Users/Utkarsh/.PlmCache/Volumes/VolumeName/Folder/IMG_100.HEIC.plm.jpg"
    // After step 1      | "/Users/Utkarsh/Desktop/IMG_100.HEIC.plm.jpg"                              | "/Volumes/VolumeName/Folder/IMG_100.HEIC.plm.jpg"
    // After step 2      | "/Users/Utkarsh/Desktop/IMG_100.HEIC"                                      | "/Volumes/VolumeName/Folder/IMG_100.HEIC"
    const pathAfterStep2 = thumbnailFilePath
        .replace(`${exports.plmThumbnailCacheDir}`, '') // See step 1 above
        .replace(/(.+)\.plm\.jpg$/, '$1'); // See step 2 above
    let originalFilePath = pathAfterStep2;
    if (os.platform() === 'win32') {
        const driveLetterOrHostname = pathAfterStep2.split(pathModule.sep)[1];
        const isDriveLetter = driveLetterOrHostname.startsWith('D_');
        if (isDriveLetter) {
            const driveLetter = driveLetterOrHostname.substring(2); // Convert "D_C" to "C"
            if (driveLetter.length !== 1) {
                logger_1.Logger.error(`A drive letter must be a single character, but "${driveLetter}" is observed. Something went wrong.`);
            }
            const pathAfterDriverLetter = pathAfterStep2.replace(`\\D_${driveLetter}`, '');
            originalFilePath = `${driveLetter}:${pathAfterDriverLetter}`;
        }
        else {
            originalFilePath = pathAfterStep2.replace(`\\H_`, `\\\\`); // Convert "\H_Hostname\Folder\File.heic" to "\\Hostname\Folder\File.heic"
        }
    }
    return originalFilePath;
}
exports.getOriginalFilePath = getOriginalFilePath;
const lastModifiedKey = 'LastModified';
async function createFileForLastModified(srcFilePath, thumbnailFileDir, logger) {
    const srcFileName = pathModule.basename(srcFilePath);
    const lastModified = fs.statSync(srcFilePath).mtime.toISOString();
    const fileContentObj = {};
    fileContentObj[lastModifiedKey] = lastModified;
    const fileContentStr = JSON.stringify(fileContentObj, null, 2);
    const logFilePath = pathModule.join(thumbnailFileDir, `${srcFileName}.log.json`);
    try {
        await fs.promises.writeFile(logFilePath, fileContentStr);
    }
    catch (error) {
        logger.error(`Failed to write file for last modified "${lastModified}" for "${srcFileName}" in "${logFilePath}". error: ${error}`, error);
        return;
    }
    logger.info(`Wrote a file for last modified "${lastModified}" for "${srcFileName}" in ${logFilePath}`);
}
exports.createFileForLastModified = createFileForLastModified;
function isThumbnailCacheAvailable(srcFilePath) {
    if (!srcFilePath)
        return false;
    const srcFileName = pathModule.basename(srcFilePath);
    const { thumbnailFilePath } = getThumbnailFilePath(srcFilePath);
    const thumbnailFileExists = fs.existsSync(thumbnailFilePath);
    if (!thumbnailFileExists)
        return false;
    const logFilePath = getThumbnailLogFilePath(srcFilePath);
    const logFileExists = fs.existsSync(logFilePath);
    if (!logFileExists)
        return false;
    let fileContentStr;
    try {
        fileContentStr = fs.readFileSync(logFilePath, 'utf8');
    }
    catch (error) {
        logger_1.Logger.error(`Failed to read log file for ${srcFileName}. Log file location is "${logFilePath}". error: ${error}`, error);
        return false;
    }
    const fileContentObj = JSON.parse(fileContentStr);
    const lastModifiedFromLogFile = fileContentObj[lastModifiedKey];
    if (!lastModifiedFromLogFile)
        return false;
    const lastModifiedFromSrcFile = fs.statSync(srcFilePath).mtime.toISOString();
    const lastModifiedMatch = lastModifiedFromLogFile === lastModifiedFromSrcFile;
    return lastModifiedMatch;
}
exports.isThumbnailCacheAvailable = isThumbnailCacheAvailable;
//# sourceMappingURL=thumbnail-cache-util.js.map