"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuTemplateOnWindowsLinux = void 0;
const common_menu_template_1 = require("./common-menu-template");
const common_help_submenu_template_1 = require("./common-help-submenu-template");
const handle_about_menu_clicked_1 = require("./handle-about-menu-clicked");
exports.menuTemplateOnWindowsLinux = [
    ...common_menu_template_1.commonMenuTemplate,
    {
        label: 'Help',
        submenu: [
            {
                label: 'About EXIF Map Visualizer',
                click: () => (0, handle_about_menu_clicked_1.handleAboutMenuClicked)()
            },
            ...common_help_submenu_template_1.commonHelpSubmenuTemplate
        ]
    }
];
//# sourceMappingURL=menu-template-on-windows-linux.js.map