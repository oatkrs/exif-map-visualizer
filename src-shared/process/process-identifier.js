"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessIdentifier = void 0;
const process_accessor_1 = require("./process-accessor");
class ProcessIdentifier {
    static get isNode() {
        return (typeof this.process !== 'undefined');
    }
    static get isElectron() {
        return this.isNode
            && (typeof this.process.type !== 'undefined');
    }
    static get isElectronMain() {
        return this.isElectron
            && (this.process.type === 'browser');
    }
    static get isElectronRenderer() {
        return this.isElectron
            && (this.process.type === 'renderer');
    }
    static get processType() {
        if (this.isElectronRenderer)
            return 'Renderer';
        if (this.isElectronMain)
            return 'Main';
        if (this.isNode)
            return 'Node';
        return 'Non-Node';
    }
}
exports.ProcessIdentifier = ProcessIdentifier;
//                   |  process  | process.type
// ------------------+-----------+----------------
// Non-Node.js       | undefined |    N/A
// Node.js           |   defined |   defined in Electron. Otherwise, undefined.
// Electron          |   defined |   defined (either "renderer" or "browser")
// Electron Renderer |   defined | "renderer"
// Electron Main     |   defined |  "browser"
ProcessIdentifier.process = process_accessor_1.ProcessAccessor.getProcess();
//# sourceMappingURL=process-identifier.js.map