"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthType = exports.OAUTH_PROVIDER = void 0;
var OAUTH_PROVIDER;
(function (OAUTH_PROVIDER) {
    OAUTH_PROVIDER["GITHUB"] = "github";
    OAUTH_PROVIDER["GOOGLE"] = "google";
    OAUTH_PROVIDER["FACEBOOK"] = "facebook";
    OAUTH_PROVIDER["TWITTER"] = "twitter";
    OAUTH_PROVIDER["LINKEDIN"] = "linkedin";
    OAUTH_PROVIDER["MICROSOFT"] = "microsoft";
    OAUTH_PROVIDER["DISCORD"] = "discord";
})(OAUTH_PROVIDER || (exports.OAUTH_PROVIDER = OAUTH_PROVIDER = {}));
var OAuthType;
(function (OAuthType) {
    OAuthType["SIGN_IN"] = "sign-in";
    OAuthType["LINK"] = "link";
})(OAuthType || (exports.OAuthType = OAuthType = {}));
//# sourceMappingURL=auth.types.js.map