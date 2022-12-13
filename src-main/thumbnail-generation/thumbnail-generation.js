"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleThumbnailGenerationIpcRequest = void 0;
const fs = require("fs");
const os = require("os");
const pathModule = require("path");
const physicalCpuCount = require("physical-cpu-count");
const workerpool = require("workerpool");
const _ = require("lodash");
const multiline_log_text_1 = require("../../src-shared/log/multiline-log-text");
const remove_invalid_thumbnail_cache_1 = require("../../src-shared/thumbnail/cache/remove-invalid-thumbnail-cache");
const thumbnail_cache_util_1 = require("../../src-shared/thumbnail/cache/thumbnail-cache-util");
const thumbnail_generation_logger_1 = require("../../src-shared/thumbnail/generation/thumbnail-generation-logger");
const generate_thumbnail_file_arg_and_result_1 = require("./generate-thumbnail-file-arg-and-result");
function handleThumbnailGenerationIpcRequest(allHeifFilePaths, heifFilePathsToGenerateThumbnail) {
    if (!allHeifFilePaths || !heifFilePathsToGenerateThumbnail) {
        thumbnail_generation_logger_1.thumbnailGenerationLogger.error(`handleThumbnailGenerationIpcRequest should be called with string arrays.`);
        thumbnail_generation_logger_1.thumbnailGenerationLogger.error(`allHeifFilePaths: ${allHeifFilePaths}, heifFilePathsToGenerateThumbnail: ${heifFilePathsToGenerateThumbnail}`, allHeifFilePaths, heifFilePathsToGenerateThumbnail);
        return;
    }
    checkFileForWorkerExists();
    (0, remove_invalid_thumbnail_cache_1.removeInvalidThumbnailCache)();
    logAllHeifFiles(allHeifFilePaths);
    logHeifFilesToGenerateThumbnail(heifFilePathsToGenerateThumbnail);
    // noinspection JSUnusedLocalSymbols
    const ignoredPromise = generateThumbnails(heifFilePathsToGenerateThumbnail); // Promise is deliberately ignored.
}
exports.handleThumbnailGenerationIpcRequest = handleThumbnailGenerationIpcRequest;
class FileForWorker {
    static get absoluteFilePath() { return this._absoluteFilePath; }
}
_a = FileForWorker;
FileForWorker._fileName = 'generate-thumbnail-file-worker.js';
FileForWorker._absoluteFilePath = pathModule.join(__dirname, _a._fileName);
function checkFileForWorkerExists() {
    const filePath = FileForWorker.absoluteFilePath;
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`The expected file path for worker used during thumbnail generation is "${filePath}"`);
    const isFileFound = fs.existsSync(filePath);
    if (isFileFound) {
        thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`The file for worker used during thumbnail generation is found.`);
    }
    else {
        thumbnail_generation_logger_1.thumbnailGenerationLogger.error(`The file for worker used during thumbnail generation is NOT found.`);
    }
}
function logAllHeifFiles(allHeifFilePaths) {
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Number of all HEIF files: ${allHeifFilePaths.length}`);
    if (allHeifFilePaths.length >= 1) {
        const filePathsText = (0, multiline_log_text_1.stringArrayToLogText)(allHeifFilePaths);
        thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`All HEIF file paths are as follows:${filePathsText}`);
    }
}
function logHeifFilesToGenerateThumbnail(heifFilePathsToGenerateThumbnail) {
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Number of HEIF files to generate thumbnails: ${heifFilePathsToGenerateThumbnail.length}`);
    if (heifFilePathsToGenerateThumbnail.length >= 1) {
        const filePathsText = (0, multiline_log_text_1.stringArrayToLogText)(heifFilePathsToGenerateThumbnail);
        thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`HEIF files to generate thumbnails are as follows:${filePathsText}`);
    }
}
function createThumbnailFileGenerationArg(filePath) {
    const arg = new generate_thumbnail_file_arg_and_result_1.ThumbnailFileGenerationArg();
    arg.srcFilePath = filePath;
    const { thumbnailFileDir, thumbnailFilePath } = (0, thumbnail_cache_util_1.getThumbnailFilePath)(arg.srcFilePath);
    arg.outputFileDir = thumbnailFileDir;
    arg.outputFilePath = thumbnailFilePath;
    return arg;
}
const logicalCpuCount = os.cpus().length;
const numberOfProcessesToUse = physicalCpuCount >= 2 ? physicalCpuCount - 1 : 1;
async function generateThumbnails(heifFilePaths) {
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Number of CPU cores, Physical: ${physicalCpuCount}, Logical: ${logicalCpuCount}`);
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Number of processes for thumbnail generation: ${numberOfProcessesToUse}`);
    const argArray = heifFilePaths.map(filePath => createThumbnailFileGenerationArg(filePath));
    // The worker process needs to be restarted per thumbnail.
    // If the worker process continues to be used for multiple thumbnails,
    // the memory consumption of the process increases, and the app will eventually crash.
    // In the code below, thumbnail generation is split into chunks, and worker processes are restarted by each chunk.
    // By numberOfFilesInChunk === numberOfProcessesToUse, each worker process will be restarted per thumbnail.
    const numberOfFilesInChunk = numberOfProcessesToUse;
    const argArrayChunks = _.chunk(argArray, numberOfFilesInChunk);
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Files are split in ${argArrayChunks.length} chunks.`);
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Each chunk contains up to ${numberOfFilesInChunk} files.`);
    for (let index = 0; index < argArrayChunks.length; index++) {
        const chunkNumber = `#${index + 1}`;
        thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Started chunk ${chunkNumber} out of ${argArrayChunks.length} chunks.`);
        const chunk = argArrayChunks[index];
        thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Chunk ${chunkNumber} contains ${chunk.length} files.`);
        await runWorkerForThumbnailGeneration(chunk);
        thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Finished chunk ${chunkNumber} out of ${argArrayChunks.length} chunks.`);
    }
}
async function runWorkerForThumbnailGeneration(argArray) {
    const logLines = argArray.map(arg => `From "${arg.srcFilePath}", a thumbnail file "${arg.outputFilePath}" will be generated.`);
    const logText = (0, multiline_log_text_1.stringArrayToLogText)(logLines);
    thumbnail_generation_logger_1.thumbnailGenerationLogger.info(`Queuing tasks for worker to generate thumbnail:${logText}`);
    const pool = workerpool.pool(FileForWorker.absoluteFilePath, {
        maxWorkers: numberOfProcessesToUse,
        workerType: 'process',
    });
    const workerPromises = argArray.map(arg => {
        return pool
            .proxy()
            .then(worker => worker.generateThumbnailFile(arg))
            .then(result => {
            thumbnail_generation_logger_1.thumbnailGenerationLogger.info('Observed completion of worker for thumbnail generation. ' +
                `From "${arg.srcFilePath}", a thumbnail file "${arg.outputFilePath}" should have been generated.`);
            (0, thumbnail_cache_util_1.createFileForLastModified)(arg.srcFilePath, arg.outputFileDir, thumbnail_generation_logger_1.thumbnailGenerationLogger);
        });
    });
    await Promise.allSettled(workerPromises);
    await pool.terminate();
}
//# sourceMappingURL=thumbnail-generation.js.map