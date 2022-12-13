"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsExtra = require("fs-extra");
const Jimp = require("jimp");
const jpegJs = require("jpeg-js");
const workerpool = require("workerpool");
const now_1 = require("../../src-shared/date-time/now");
const generate_thumbnail_file_arg_and_result_1 = require("./generate-thumbnail-file-arg-and-result");
class WorkerLogger {
    info(message, ...obj) {
        console.info(`[${now_1.Now.extendedFormat}] [Worker] [info] [Thumbnail Generation] ${message}`, ...obj);
    }
    warn(message, ...obj) {
        console.warn(`[${now_1.Now.extendedFormat}] [Worker] [warn] [Thumbnail Generation] ${message}`, ...obj);
    }
    error(message, ...obj) {
        console.error(`[${now_1.Now.extendedFormat}] [Worker] [error] [Thumbnail Generation] ${message}`, ...obj);
    }
}
const logger = new WorkerLogger();
function resizeAndEncode(bitmap, quality) {
    const image = new Jimp(bitmap);
    const thumbnailWidthHeight = 200; // 200px at most for width/height on the browser
    const highDpiFactor = 2; // Multiplying by some factor for high DPI display. 2 is for Retina display.
    const widthHeight = thumbnailWidthHeight * highDpiFactor;
    image.scaleToFit(widthHeight, widthHeight);
    const { data, width, height } = image.bitmap;
    return jpegJs.encode({ data, width, height }, quality);
}
//#region ---------------------- Modified heic-convert ----------------------
// The code below is the modified version of heic-convert v1.2.4.
// 2 major modifications:
// 1. Shrink the bitmap before JPEG encoding.
//  - Originally, the bitmap with the width/height of the original image is encoded.
//  - Originally, the generated thumbnail file takes 0.5 to 2 MB.
//  - The shrunk thumbnail file takes 20 to 100 kB.
// 2. Stripping out the unused code. e.g. PNG is not used, so it's removed.
// Also, note that "jpeg-js": "^0.4.1" and "heic-decode": "^1.1.2" are the dependencies of heic-convert v1.2.4.
const decode = require('heic-decode');
const to = {
    JPEG: ({ data, width, height, quality }) => resizeAndEncode({ data, width, height }, quality).data, // Originally jpegJs.encode({ data, width, height }, quality).data,
};
const convertImage = async ({ image, format, quality }) => {
    return await to[format]({
        width: image.width,
        height: image.height,
        data: Buffer.from(image.data),
        quality: Math.floor(quality * 100)
    });
};
const convert = async ({ buffer, format, quality, all }) => {
    if (!to[format]) {
        throw new Error(`output format needs to be one of [${Object.keys(to)}]`);
    }
    if (!all) {
        const image = await decode({ buffer });
        return await convertImage({ image, format, quality });
    }
    const images = await decode.all({ buffer });
    return images.map(image => {
        return {
            convert: async () => await convertImage({
                image: await image.decode(),
                format,
                quality
            })
        };
    });
};
const heicConvert = async ({ buffer, format, quality = 0.92 }) => await convert({ buffer, format, quality, all: false });
//#endregion ---------------------- Modified heic-convert ----------------------
async function generateThumbnailFile(arg) {
    logger.info(`A worker is started to generate thumbnail for ${arg.srcFilePath}`);
    if (!arg) {
        return new generate_thumbnail_file_arg_and_result_1.ThumbnailFileGenerationResult('null-arg');
    }
    let inputBuffer;
    try {
        inputBuffer = await fsExtra.promises.readFile(arg.srcFilePath);
    }
    catch (error) {
        logger.error(`Failed to read source file for thumbnail generation. Source file path is "${arg.srcFilePath}". error: ${error}`, error);
        return new generate_thumbnail_file_arg_and_result_1.ThumbnailFileGenerationResult('failed-to-read-src-file');
    }
    // ------------------------
    // Note as of Oct 21, 2020:
    // Requiring heic-convert here because this module is premature as of Oct 21, 2020.
    // When this module is imported at the top of the file, the application terminates right after launching it.
    // Importing heic-convert appears to enable the option to terminate the application
    // for unhandled promise rejection, and the unhandled promise comes from electron-updater.
    // When this kind of butterfly effect is shown at application launch, it is very difficult to debug.
    // Therefore, importing heic-convert here to be able to track when things go wrong.
    // ------------------------
    // Note as of Dec 7, 2022:
    // The modified version of heic-convert is pasted in this file, so heic-convert is no longer required/imported.
    // Leaving the commented-out require/import line to indicate that require/import is replaced with the pasted code.
    // ------------------------
    // const heicConvert: typeof import('heic-convert') = require('heic-convert');
    const jpegQuality = 0.92; // Default value of heic-convert. Tested several values but the default is okay as of Dec 7, 2022.
    let outputBuffer;
    try {
        outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: jpegQuality, // the jpeg compression quality, between 0 and 1
        });
    }
    catch (error) {
        logger.error(`Failed in heic-convert. error: ${error}`, error);
        return new generate_thumbnail_file_arg_and_result_1.ThumbnailFileGenerationResult('failed-in-heic-convert');
    }
    try {
        await fsExtra.ensureDir(arg.outputFileDir);
    }
    catch (error) {
        logger.error(`Failed to ensure thumbnail directory exists. Directory path is "${arg.outputFileDir}". error: ${error}`, error);
        return new generate_thumbnail_file_arg_and_result_1.ThumbnailFileGenerationResult('failed-to-ensure-dir');
    }
    try {
        await fsExtra.promises.writeFile(arg.outputFilePath, outputBuffer);
    }
    catch (error) {
        logger.error(`Failed to write the file for thumbnail in "${arg.outputFilePath}". error: ${error}`, error);
        return new generate_thumbnail_file_arg_and_result_1.ThumbnailFileGenerationResult('failed-to-write-thumbnail-file');
    }
    logger.info(`Created the file for thumbnail in "${arg.outputFilePath}".`);
    return new generate_thumbnail_file_arg_and_result_1.ThumbnailFileGenerationResult('success');
}
workerpool.worker({
    generateThumbnailFile: generateThumbnailFile,
});
//# sourceMappingURL=generate-thumbnail-file-worker.js.map