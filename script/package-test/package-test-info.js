const path = require('path');
const { version } = require('../../package.json');
const getLogDirectory = require('./get-log-directory');

class PackageTestInfo {
  constructor() {
    this.distDirectory = `.${path.sep}dist`;
    this.releaseDirectory = `.${path.sep}release`;
    this.logDirectory = getLogDirectory();
    this.addMiscPlatformDependentProperties();
  }

  addMiscPlatformDependentProperties() {
    switch(global.process.platform) {
      case 'win32':
        this.packageCreationCommand = 'npm run package:windows';
        this.expectedPackageLocation = `${this.releaseDirectory}\\EXIF Map Visualizer Setup ${version}.exe`;
        this.executablePrelaunchCommand = `"${this.releaseDirectory}\\EXIF Map Visualizer Setup ${version}.exe" /S`;
        this.executableLaunchCommand = `"${process.env.APPDATA}\\..\\Local\\Programs\\EXIF Map Visualizer\\EXIF Map Visualizer.exe"`;
        break;
      case 'darwin':
        this.packageCreationCommand = 'npm run package:mac';
        this.expectedPackageLocation = `${this.releaseDirectory}/EXIF Map Visualizer-${version}.dmg`;
        this.executablePrelaunchCommand = `hdiutil attach "${this.releaseDirectory}/EXIF Map Visualizer-${version}.dmg"`;
        this.executableLaunchCommand = `open -W "/Volumes/EXIF Map Visualizer ${version}/EXIF Map Visualizer.app"`;
        break;
      case 'linux':
        this.packageCreationCommand = 'npm run package:linux';
        this.expectedPackageLocation = `${this.releaseDirectory}/EXIF Map Visualizer-${version}.AppImage`;
        this.executableLaunchCommand = `"${this.releaseDirectory}/EXIF Map Visualizer-${version}.AppImage"`;
        break;
      default:
        throw new Error(`Unsupported platform for "${__filename}"`);
    }
  }
}

module.exports = new PackageTestInfo();
