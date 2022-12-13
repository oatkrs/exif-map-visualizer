"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentDetector = void 0;
class EnvironmentDetector {
    static get isKarma() {
        return typeof __karma__ !== 'undefined';
    }
    static get isElectronMochaMain() {
        return !!process.env.PLM_EM_MAIN;
    }
    static get isElectronMochaRenderer() {
        return !!process.env.PLM_EM_RENDERER;
    }
    static get isUnitTest() {
        return this.isKarma || this.isElectronMochaMain || this.isElectronMochaRenderer;
    }
}
exports.EnvironmentDetector = EnvironmentDetector;
//# sourceMappingURL=environment-detector.js.map