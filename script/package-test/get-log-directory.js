const path = require('path');

function parsePathWithWindowsEnvironmentVariable(path) {
  const parsed = path.replace(/%([^%]+)%/g, (_,n) => process.env[n]);
  return parsed;
}

function getAppDataDirectory() {
  switch(global.process.platform) {
    case 'win32':
      return parsePathWithWindowsEnvironmentVariable('%APPDATA%');
    case 'darwin':
      return `${process.env.HOME}/Library/Application Support`;
    case 'linux':
      return `${process.env.HOME}/.config`;
    default:
      throw new Error(`Unsupported platform for "${__filename}"`);
  }
}

function appendEXIFMapVisualizerLogLocation(appDataDirectory) {
  const appended = `${appDataDirectory}${path.sep}EXIF Map Visualizer${path.sep}logs`;
  return appended;
}

function getLogDirectory() {
  const appDataDirectory = getAppDataDirectory();
  const logDirectory = appendEXIFMapVisualizerLogLocation(appDataDirectory);
  return logDirectory;
}

module.exports = getLogDirectory;
