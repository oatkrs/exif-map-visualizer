"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
const analytics_1 = require("../../src-shared/analytics/analytics");
const dev_or_prod_1 = require("../../src-shared/dev-or-prod/dev-or-prod");
const is_prerelease_version_1 = require("../../src-shared/version/is-prerelease-version");
const electron_main_1 = require("../electron-main");
const auto_update_logger_1 = require("./auto-update-logger");
electron_updater_1.autoUpdater.logger = auto_update_logger_1.autoUpdateLogger;
electron_updater_1.autoUpdater.on('download-progress', progress => {
    const progressPercentage = `Download progress: ${progress.percent.toFixed(1)}%`;
    const transferredOutOfTotal = `Downloaded ${progress.transferred} bytes out of ${progress.total} bytes`;
    const downloadSpeed = `Download speed: ${progress.bytesPerSecond} B/s`;
    const message = `${progressPercentage}, ${transferredOutOfTotal}, ${downloadSpeed}.`;
    auto_update_logger_1.autoUpdateLogger.info(message);
});
const createMessageForMessageBox = (info) => {
    return `A new version of EXIF Map Visualizer is available and will be installed after restart.
Do you want to restart this application now?

Current version: ${electron_1.app.getVersion()}
Latest version: ${info.version}`;
};
electron_updater_1.autoUpdater.on('update-downloaded', (info) => {
    auto_update_logger_1.autoUpdateLogger.info(`Update downloaded. Updating from ${electron_1.app.getVersion()} to ${info.version}.`);
    analytics_1.Analytics.trackEvent('Auto-update', `Auto-update`, `Updating from ${electron_1.app.getVersion()} to ${info.version}`);
    electron_1.dialog.showMessageBox(electron_main_1.mainWindow, {
        title: 'A new version of EXIF Map Visualizer is available!',
        type: 'info',
        message: createMessageForMessageBox(info),
        buttons: ['Yes', 'No'],
    }).then(result => {
        const yes = result.response === 0;
        auto_update_logger_1.autoUpdateLogger.info(`User clicked "${yes ? 'Yes' : 'No'}" on the dialog to restart this application to install the new version ${info.version}.`);
        if (yes) {
            electron_updater_1.autoUpdater.quitAndInstall(true, true);
        }
    });
});
electron_1.app.on('ready', async () => {
    if (dev_or_prod_1.DevOrProd.isDev) {
        auto_update_logger_1.autoUpdateLogger.info(`Auto-update is disabled in development environment.`);
        return;
    }
    if ((0, is_prerelease_version_1.isPrereleaseVersion)()) {
        auto_update_logger_1.autoUpdateLogger.info(`Auto-update is disabled in prerelease versions (i.e. alpha, beta, and rc).`);
        return;
    }
    await electron_updater_1.autoUpdater.checkForUpdates().catch(reason => {
        auto_update_logger_1.autoUpdateLogger.warn(`Promise from autoUpdater.checkForUpdates() is rejected. ${reason}`);
    });
});
//# sourceMappingURL=configure-auto-update.js.map