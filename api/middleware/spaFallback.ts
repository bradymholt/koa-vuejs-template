import * as Koa from 'koa';

export default function spaFallback(apiPathPrefix: string, rewritePath: string) {
  let apiPathPrefixRegEx = new RegExp(`${apiPathPrefix}.+\/?`);
  return async (ctx: Koa.Context, next) => {
    if (!ctx.url.match(/\.\S{2,4}$/) && !apiPathPrefixRegEx.test(ctx.url) && !ctx.url.match(/webpack\_hmr/)) {
      ctx.url = "/";
    }
    await next();
  }
}
