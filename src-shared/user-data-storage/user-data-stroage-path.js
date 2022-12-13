"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataStoragePath = void 0;
var UserDataStoragePath;
(function (UserDataStoragePath) {
    let Analytics;
    (function (Analytics) {
        Analytics.UserId = ['Analytics', 'UserId'];
    })(Analytics = UserDataStoragePath.Analytics || (UserDataStoragePath.Analytics = {}));
    let History;
    (function (History) {
        History.FirstLaunchDateTime = ['History', 'FirstLaunchDateTime'];
        History.LastLaunchDateTime = ['History', 'LastLaunchDateTime'];
        History.LaunchCount = ['History', 'LaunchCount'];
        History.ClickedOkOnWelcomeDialog = ['History', 'ClickedOkOnWelcomeDialog'];
    })(History = UserDataStoragePath.History || (UserDataStoragePath.History = {}));
    let GoogleMaps;
    (function (GoogleMaps) {
        GoogleMaps.ApiKey = ['GoogleMaps', 'ApiKey'];
    })(GoogleMaps = UserDataStoragePath.GoogleMaps || (UserDataStoragePath.GoogleMaps = {}));
    let LeafletMap;
    (function (LeafletMap) {
        LeafletMap.SelectedLayer = ['LeafletMap', 'SelectedLayer'];
    })(LeafletMap = UserDataStoragePath.LeafletMap || (UserDataStoragePath.LeafletMap = {}));
    let PhotoDataViewer;
    (function (PhotoDataViewer) {
        PhotoDataViewer.WindowX = ['PhotoDataViewer', 'WindowX'];
        PhotoDataViewer.WindowY = ['PhotoDataViewer', 'WindowY'];
        PhotoDataViewer.WindowWidth = ['PhotoDataViewer', 'WindowWidth'];
        PhotoDataViewer.WindowHeight = ['PhotoDataViewer', 'WindowHeight'];
    })(PhotoDataViewer = UserDataStoragePath.PhotoDataViewer || (UserDataStoragePath.PhotoDataViewer = {}));
    let UserSettings;
    (function (UserSettings) {
        UserSettings.ShowStatusBar = ['UserSettings', 'ShowStatusBar'];
        UserSettings.DateFormat = ['UserSettings', 'DateFormat'];
        UserSettings.ClockSystemFormat = ['UserSettings', 'ClockSystemFormat'];
    })(UserSettings = UserDataStoragePath.UserSettings || (UserDataStoragePath.UserSettings = {}));
})(UserDataStoragePath = exports.UserDataStoragePath || (exports.UserDataStoragePath = {}));
//# sourceMappingURL=user-data-stroage-path.js.map