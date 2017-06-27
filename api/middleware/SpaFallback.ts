import * as Koa from "koa";

/**
  Middleware that will rewrite (not redirect!) nested SPA page requests to the SPA root path.
  For SPA apps that are using client-side routing, a refresh or direct request for a nested path will
  be received by the server but the root path page should be served.

  Paramters:
    apiPathPrefix - The api path prefix is what requests for the REST api begin with.  These
                    will be ignored and not rewritten.  So, if this is supplied as 'api',
                    any requests starting with 'api' will not be rewritten.
    rewritePath   - What path to rewrite to (usually '/')

  Examples:
    (apiPathPrefix="api",rewritePath="/")
      http://localhost:5000/api/auth/login => (no rewrite)
      http://localhost:5000/style.css => (no rewrite)
      http://localhost:5000/contacts => /
      http://localhost:5000/contacts/5/edit => /
 */
export default function spaFallback(
  apiPathPrefix: string,
  rewritePath: string
) {
  let apiPathPrefixRegEx = new RegExp(`${apiPathPrefix}.+\/?`);
  return async (ctx: Koa.Context, next) => {
    if (
      // Not an API request
      !apiPathPrefixRegEx.test(ctx.url) &&
      // Not an asset request (image, css, js, anythingwith.ext)
      !ctx.url.match(/\.\S{2,4}$/) &&
      // Not a webpack HMR request
      !ctx.url.match(/webpack\_hmr/)
    ) {
      ctx.url = rewritePath;
    }
    await next();
  };
}
