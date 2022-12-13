"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMenuTemplate = void 0;
const analytics_1 = require("../../src-shared/analytics/analytics");
const dev_or_prod_1 = require("../../src-shared/dev-or-prod/dev-or-prod");
const ipc_constants_1 = require("../../src-shared/ipc/ipc-constants");
const logger_1 = require("../../src-shared/log/logger");
const electron_main_1 = require("../electron-main");
const handleManageSettingsClicked = () => {
    logger_1.Logger.info(`[Main Window Menu] Clicked "Manage Settings".`);
    analytics_1.Analytics.trackEvent('Main Window Menu', 'Clicked "Manage Settings"');
    if (!electron_main_1.mainWindow)
        return;
    electron_main_1.mainWindow.webContents.send(ipc_constants_1.IpcConstants.ManageSettings.Name);
};
exports.commonMenuTemplate = [
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                visible: dev_or_prod_1.DevOrProd.isDev,
                accelerator: dev_or_prod_1.DevOrProd.isDev ? 'CmdOrCtrl+R' : '',
                click(item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                },
            },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: 'Settings',
        submenu: [
            {
                label: 'Manage Settings',
                click: () => handleManageSettingsClicked()
            }
        ]
    }
];
//# sourceMappingURL=common-menu-template.js.map