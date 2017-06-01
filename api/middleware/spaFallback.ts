export default function spaFallback(apiPathPrefix: string, rewritePath: string) {
    let apiPathPrefixRegEx = new RegExp(`${apiPathPrefix}.+\/?`);
    return async (ctx, next) => {
        if (!ctx.url.match(/\.\S{2,3}$/) && !apiPathPrefixRegEx.test(ctx.url)) {
            ctx.url = "/";
        }
        await next();
    }
}
