"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function spaFallback(apiPathPrefix, rewritePath) {
    let apiPathPrefixRegEx = new RegExp(`/${apiPathPrefix}\/.+/`);
    return async (ctx, next) => {
        if (!apiPathPrefixRegEx.test(ctx.url) && !ctx.url.match(/\.\S{2,3}$/)) {
            ctx.url = "/";
        }
        await next();
    };
}
exports.default = spaFallback;
//# sourceMappingURL=spaFallback.js.map