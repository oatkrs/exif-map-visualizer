"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmplitudeConfig = void 0;
const dev_or_prod_1 = require("../../dev-or-prod/dev-or-prod");
const is_prerelease_version_1 = require("../../version/is-prerelease-version");
class AmplitudeApiKey {
}
AmplitudeApiKey.dev = '504cfac385ea79239a18052ee430fc19';
AmplitudeApiKey.prod = '302caa58852ce254c232fb74d27ddbd0';
class AmplitudeConfig {
    static get apiKey() {
        if (dev_or_prod_1.DevOrProd.isDev)
            return AmplitudeApiKey.dev;
        return (0, is_prerelease_version_1.isPrereleaseVersion)()
            ? AmplitudeApiKey.dev
            : AmplitudeApiKey.prod;
    }
}
exports.AmplitudeConfig = AmplitudeConfig;
//# sourceMappingURL=amplitude-config.js.map