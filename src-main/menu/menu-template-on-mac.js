"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuTemplateOnMac = void 0;
const common_menu_template_1 = require("./common-menu-template");
const common_help_submenu_template_1 = require("./common-help-submenu-template");
const handle_about_menu_clicked_1 = require("./handle-about-menu-clicked");
exports.menuTemplateOnMac = [
    {
        label: 'The name of the first menu item is the application name on macOS',
        submenu: [
            {
                label: 'About EXIF Map Visualizer',
                click: () => (0, handle_about_menu_clicked_1.handleAboutMenuClicked)()
            },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    },
    ...common_menu_template_1.commonMenuTemplate,
    {
        label: 'Help',
        submenu: [
            ...common_help_submenu_template_1.commonHelpSubmenuTemplate
        ]
    }
];
//# sourceMappingURL=menu-template-on-mac.js.map