"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixpanelConfig = void 0;
const dev_or_prod_1 = require("../../dev-or-prod/dev-or-prod");
const is_prerelease_version_1 = require("../../version/is-prerelease-version");
class MixpanelProjectToken {
}
MixpanelProjectToken.dev = '9f48c4c504ae32885d31d8c0910d072a';
MixpanelProjectToken.prod = '4b495f033948124840cad7a1e72a0d3c';
class MixpanelConfig {
    static get projectToken() {
        if (dev_or_prod_1.DevOrProd.isDev)
            return MixpanelProjectToken.dev;
        return (0, is_prerelease_version_1.isPrereleaseVersion)()
            ? MixpanelProjectToken.dev
            : MixpanelProjectToken.prod;
    }
}
exports.MixpanelConfig = MixpanelConfig;
//# sourceMappingURL=mixpanel-config.js.map