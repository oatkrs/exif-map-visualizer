"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonHelpSubmenuTemplate = void 0;
const fsExtra = require("fs-extra");
const analytics_1 = require("../../src-shared/analytics/analytics");
const command_1 = require("../../src-shared/command/command");
const dev_or_prod_1 = require("../../src-shared/dev-or-prod/dev-or-prod");
const ipc_constants_1 = require("../../src-shared/ipc/ipc-constants");
const log_file_config_1 = require("../../src-shared/log/file-config/log-file-config");
const logger_1 = require("../../src-shared/log/logger");
const electron_main_1 = require("../electron-main");
const handleShowWelcomeDialogClicked = () => {
    logger_1.Logger.info(`[Main Window Menu] Clicked "Show Welcome Dialog".`);
    analytics_1.Analytics.trackEvent('Main Window Menu', 'Clicked "Show Welcome Dialog"');
    if (!electron_main_1.mainWindow)
        return;
    electron_main_1.mainWindow.webContents.send(ipc_constants_1.IpcConstants.WelcomeDialog.Name);
};
const handleOpenLogFolderClicked = () => {
    logger_1.Logger.info(`[Main Window Menu] Clicked "Open Log Folder".`);
    analytics_1.Analytics.trackEvent('Main Window Menu', 'Clicked "Open Log Folder"');
    fsExtra.ensureDirSync(log_file_config_1.LogFileConfig.dirName); // The log folder is created when the app starts, but ensuring the directory just in case.
    (0, command_1.openWithAssociatedApp)(log_file_config_1.LogFileConfig.dirName);
};
const changeMap = (ipcMapChangeArg) => {
    if (!electron_main_1.mainWindow)
        return;
    electron_main_1.mainWindow.webContents.send(ipc_constants_1.IpcConstants.Map.ChangeEvent.Name, ipcMapChangeArg);
};
const selectMap = (ipcMapChangeArg) => {
    logger_1.Logger.info(`[Main Window Menu] Selected Map: ${ipcMapChangeArg}.`);
    analytics_1.Analytics.trackEvent('Main Window Menu', `[Main Window Menu] Selected Map`, `Selected Map: ${ipcMapChangeArg}`);
    changeMap(ipcMapChangeArg);
};
exports.commonHelpSubmenuTemplate = [
    {
        label: 'Show Welcome Dialog',
        click: () => handleShowWelcomeDialogClicked()
    },
    { type: 'separator' },
    {
        label: 'Advanced Menu',
        submenu: [
            {
                label: 'Open Log Folder',
                click: () => handleOpenLogFolderClicked(),
            },
            { role: 'toggleDevTools' },
            {
                label: 'Map',
                visible: dev_or_prod_1.DevOrProd.isDev,
                submenu: [
                    {
                        label: 'OpenStreetMap',
                        type: 'radio',
                        checked: true,
                        click: () => selectMap(ipc_constants_1.IpcConstants.Map.ChangeEvent.Arg.OpenStreetMap)
                    },
                    {
                        label: '[Experimental] Google Maps (Your API key is required. See Developer Tools console.)',
                        type: 'radio',
                        click: () => selectMap(ipc_constants_1.IpcConstants.Map.ChangeEvent.Arg.GoogleMaps)
                    }
                ]
            }
        ]
    }
];
//# sourceMappingURL=common-help-submenu-template.js.map