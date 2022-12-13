"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveReload = void 0;
const args = process.argv.slice(1);
const isLiveReloadMode = args.some(val => val === '--serve');
class LiveReload {
    static get enabled() { return isLiveReloadMode; }
}
exports.LiveReload = LiveReload;
//# sourceMappingURL=live-reload.js.map