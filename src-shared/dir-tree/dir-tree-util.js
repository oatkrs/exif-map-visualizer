"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFlattenedDirTree = void 0;
function convertToFlattenedDirTree(dirTreeObject) {
    const flattenedDirTree = [];
    flattenDirectoryTree([dirTreeObject], flattenedDirTree);
    return flattenedDirTree;
}
exports.convertToFlattenedDirTree = convertToFlattenedDirTree;
function flattenDirectoryTree(srcDirTreeArray, dstDirTreeArray) {
    srcDirTreeArray.forEach((element) => {
        dstDirTreeArray.push(element);
        if (element?.children) {
            flattenDirectoryTree(element.children, dstDirTreeArray);
        }
    });
    return dstDirTreeArray;
}
//# sourceMappingURL=dir-tree-util.js.map