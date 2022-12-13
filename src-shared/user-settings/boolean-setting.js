"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanSetting = void 0;
class BooleanSetting {
    static convertToBoolean(settingValue) {
        return settingValue === this.TrueValue;
    }
    static convertToSettingValue(value) {
        return value ? this.TrueValue : this.FalseValue;
    }
    static isSettingValueValid(settingValue) {
        const isValid = settingValue === this.TrueValue || settingValue === this.FalseValue;
        return isValid;
    }
}
exports.BooleanSetting = BooleanSetting;
BooleanSetting.TrueValue = 'true';
BooleanSetting.FalseValue = 'false';
//# sourceMappingURL=boolean-setting.js.map