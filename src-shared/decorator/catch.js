"use strict";
// This file is based on and modified from https://github.com/valjic1/catch-decorator-ts/blob/master/src/index.ts
// Ideally, catch-decorator-ts should simply be installed and used, but there are some compile errors.
// Therefore, the content of catch-decorator-ts exists in exif-map-visualizer repo with some modification.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCatch = exports.Catch = void 0;
/* eslint-disable @typescript-eslint/ban-types */ // Suppress the lint error "Don't use `Function` as a type."
function isPromise(object) {
    return object && Promise.resolve(object) === object;
}
function isFunction(func) {
    return typeof func === 'function' || func instanceof Function;
}
const Factory = (ErrorClassConstructor, handler) => {
    return (target, key, descriptor) => {
        const { value } = descriptor;
        if (!handler) {
            handler = ErrorClassConstructor;
            ErrorClassConstructor = undefined;
        }
        descriptor.value = async function (...args) {
            try {
                const response = value.apply(this, args);
                return isPromise(response) ? await response : Promise.resolve(response);
            }
            catch (error) {
                if (isFunction(handler) &&
                    (ErrorClassConstructor === undefined ||
                        error instanceof ErrorClassConstructor)) {
                    return handler.call(null, error, this, ...args);
                }
                throw error;
            }
        };
        return descriptor;
    };
};
const Catch = (ErrorClassConstructor, handler) => Factory(ErrorClassConstructor, handler);
exports.Catch = Catch;
const DefaultCatch = (handler) => Factory(handler);
exports.DefaultCatch = DefaultCatch;
//# sourceMappingURL=catch.js.map