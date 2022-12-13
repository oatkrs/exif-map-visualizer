"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const proxy_require_1 = require("../../src-shared/require/proxy-require");
const logger_1 = require("../../src-shared/log/logger");
const menu_template_on_windows_linux_1 = require("./menu-template-on-windows-linux");
const menu_template_on_mac_1 = require("./menu-template-on-mac");
const os = proxy_require_1.ProxyRequire.os;
const getMenuTemplate = () => {
    switch (os.platform()) {
        case 'win32':
            return menu_template_on_windows_linux_1.menuTemplateOnWindowsLinux;
        case 'darwin':
            return menu_template_on_mac_1.menuTemplateOnMac;
        case 'linux':
            return menu_template_on_windows_linux_1.menuTemplateOnWindowsLinux;
        default:
            const message = 'Unsupported platform for Application Menu.';
            logger_1.Logger.error(message);
            throw new Error(message);
    }
};
const menu = electron_1.Menu.buildFromTemplate(getMenuTemplate());
electron_1.Menu.setApplicationMenu(menu);
//# sourceMappingURL=menu.js.map