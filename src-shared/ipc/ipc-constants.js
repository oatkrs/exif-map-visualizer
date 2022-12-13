"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcConstants = void 0;
var IpcConstants;
(function (IpcConstants) {
    let AboutBox;
    (function (AboutBox) {
        AboutBox.Name = 'ipc-constants-show-about-box';
    })(AboutBox = IpcConstants.AboutBox || (IpcConstants.AboutBox = {}));
    let ManageSettings;
    (function (ManageSettings) {
        ManageSettings.Name = 'ipc-constants-manage-settings';
    })(ManageSettings = IpcConstants.ManageSettings || (IpcConstants.ManageSettings = {}));
    let WelcomeDialog;
    (function (WelcomeDialog) {
        WelcomeDialog.Name = 'ipc-constants-show-welcome-dialog';
    })(WelcomeDialog = IpcConstants.WelcomeDialog || (IpcConstants.WelcomeDialog = {}));
    let Map;
    (function (Map) {
        let ChangeEvent;
        (function (ChangeEvent) {
            ChangeEvent.Name = 'ipc-constants-map-change';
            let Arg;
            (function (Arg) {
                Arg.GoogleMaps = 'GoogleMaps';
                Arg.OpenStreetMap = 'OpenStreetMap';
            })(Arg = ChangeEvent.Arg || (ChangeEvent.Arg = {}));
        })(ChangeEvent = Map.ChangeEvent || (Map.ChangeEvent = {}));
    })(Map = IpcConstants.Map || (IpcConstants.Map = {}));
    let ThumbnailGenerationInMainProcess;
    (function (ThumbnailGenerationInMainProcess) {
        ThumbnailGenerationInMainProcess.Name = 'ipc-constants-thumbnail-generation-in-main-process';
    })(ThumbnailGenerationInMainProcess = IpcConstants.ThumbnailGenerationInMainProcess || (IpcConstants.ThumbnailGenerationInMainProcess = {}));
    let PhotoDataViewer;
    (function (PhotoDataViewer) {
        PhotoDataViewer.Name = 'ipc-constants-launch-photo-data-viewer';
    })(PhotoDataViewer = IpcConstants.PhotoDataViewer || (IpcConstants.PhotoDataViewer = {}));
})(IpcConstants = exports.IpcConstants || (exports.IpcConstants = {}));
//# sourceMappingURL=ipc-constants.js.map