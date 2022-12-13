import { MenuItemConstructorOptions } from 'electron';
import { commonMenuTemplate } from './common-menu-template';
import { commonHelpSubmenuTemplate } from './common-help-submenu-template';
import { handleAboutMenuClicked } from './handle-about-menu-clicked';

export const menuTemplateOnWindowsLinux: MenuItemConstructorOptions[] = [
  ...commonMenuTemplate,
  {
    label: 'Help',
    submenu: [
      {
        label: 'About EXIF Map Visualizer',
        click: () => handleAboutMenuClicked()
      },
      ...commonHelpSubmenuTemplate
    ]
  }
];
