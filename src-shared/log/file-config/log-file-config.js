"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFileConfig = void 0;
const now_1 = require("../../date-time/now");
const process_identifier_1 = require("../../process/process-identifier");
const proxy_require_1 = require("../../require/proxy-require");
const ipcChannelName = 'get-log-file-config-from-main';
const pathSep = proxy_require_1.ProxyRequire.path.sep;
class LogFileConfigState {
    constructor(dirName, fileName) {
        this.dirName = dirName;
        this.fileName = fileName;
        this.filePath = `${dirName}${pathSep}${fileName}`;
    }
}
/**
 * Handler of LogFileConfigState to ensure that
 *  - LogFileConfigState is initialized only once.
 *  - LogFileConfigState can be gotten after initialization.
 */
class LogFileConfigStateHandler {
    constructor() {
        this.logFileConfigState = 'uninitialized';
    }
    isInitialized() {
        return this.logFileConfigState !== 'uninitialized';
    }
    initialize(logFileConfigState) {
        if (this.logFileConfigState === 'uninitialized') {
            this.logFileConfigState = logFileConfigState;
        }
        else {
            throw new Error('LogFileConfigStateHandler is already initalized and cannot be initialized more than once.');
        }
    }
    get() {
        if (this.logFileConfigState === 'uninitialized') {
            throw new Error('LogFileConfigStateHandler is NOT initialized yet and cannot be gotten before initialization.');
        }
        else {
            return this.logFileConfigState;
        }
    }
}
class LogFileConfig {
    static setup(dirName, fileName) {
        if (process_identifier_1.ProcessIdentifier.isElectronMain) {
            this.config.initialize(new LogFileConfigState(dirName, fileName));
        }
        else {
            throw new Error('LogFileConfig can be set up from Electron main process only.');
        }
    }
    static ensureCacheForRenderer() {
        if (!this.configCacheForRenderer.isInitialized()) {
            const configFromMain = proxy_require_1.ProxyRequire.electron.ipcRenderer.sendSync(ipcChannelName);
            this.configCacheForRenderer.initialize(configFromMain);
        }
    }
    static getConfigCacheForRenderer() {
        this.ensureCacheForRenderer();
        return this.configCacheForRenderer.get();
    }
    static get dirName() {
        if (!process_identifier_1.ProcessIdentifier.isElectron)
            throw new Error('Use of this method from non-Electron process is not expected.');
        return process_identifier_1.ProcessIdentifier.isElectronMain
            ? this.config.get().dirName
            : this.getConfigCacheForRenderer().dirName;
    }
    static get fileName() {
        if (!process_identifier_1.ProcessIdentifier.isElectron)
            throw new Error('Use of this method from non-Electron process is not expected.');
        return process_identifier_1.ProcessIdentifier.isElectronMain
            ? this.config.get().fileName
            : this.getConfigCacheForRenderer().fileName;
    }
    static get filePath() {
        if (!process_identifier_1.ProcessIdentifier.isElectron)
            throw new Error('Use of this method from non-Electron process is not expected.');
        return process_identifier_1.ProcessIdentifier.isElectronMain
            ? this.config.get().filePath
            : this.getConfigCacheForRenderer().filePath;
    }
}
exports.LogFileConfig = LogFileConfig;
LogFileConfig.config = new LogFileConfigStateHandler();
LogFileConfig.configCacheForRenderer = new LogFileConfigStateHandler();
class LogFileConfigSetup {
    static setupIpcChannelListnerInMainProcess() {
        proxy_require_1.ProxyRequire.electron.ipcMain.on(ipcChannelName, (event, arg) => {
            event.returnValue = LogFileConfig.config.get();
        });
    }
    static setupLogFileConfig() {
        const appDataDirectory = proxy_require_1.ProxyRequire.electron.app.getPath('appData');
        const logDirectory = `${appDataDirectory}${pathSep}EXIF Map Visualizer${pathSep}logs`;
        const fileName = `${now_1.Now.basicFormat}_exif-map-visualizer_log.txt`;
        LogFileConfig.setup(logDirectory, fileName);
    }
    static setup() {
        this.setupIpcChannelListnerInMainProcess();
        this.setupLogFileConfig();
    }
}
if (process_identifier_1.ProcessIdentifier.isElectronMain) {
    LogFileConfigSetup.setup();
}
//# sourceMappingURL=log-file-config.js.map