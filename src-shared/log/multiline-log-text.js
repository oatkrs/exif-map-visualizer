"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringArrayToLogText = exports.MultilineLogText = void 0;
class MultilineLogText {
    constructor() {
        this._text = '';
        this.indent = '  '; // 2 spaces as the default indent to make the multiline text look better in the log
    }
    get text() { return this._text; }
    addLine(line = '') {
        const newLine = `${this.indent}${line}\n`;
        this._text = this._text + newLine;
    }
    addLineWithoutIndent(line = '') {
        const newLine = `${line}\n`;
        this._text = this._text + newLine;
    }
    addLines(lines) {
        lines.forEach(line => this.addLine(line));
    }
}
exports.MultilineLogText = MultilineLogText;
function stringArrayToLogText(lines) {
    const multilineLogText = new MultilineLogText();
    multilineLogText.addLineWithoutIndent(); // Add a line break at the beginning to make the multiline text look better in the log
    multilineLogText.addLines(lines);
    return multilineLogText.text;
}
exports.stringArrayToLogText = stringArrayToLogText;
//# sourceMappingURL=multiline-log-text.js.map