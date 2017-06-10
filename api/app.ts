import * as Koa from 'koa';
import * as serve from 'koa-static';
import { createConnection as createDbConnection, ConnectionOptions, Connection } from 'typeorm';
import { createKoaServer } from "routing-controllers";
import SpaFallback from './middleware/SpaFallback';
import JwtAuthenticate from './middleware/JwtAuthenticator';
import boostrapWebpackMiddleware from './middleware/Webpack';
import dbInitializer from "./db/Initializer";
import * as config from 'config';

async function init() {
  await dbInitializer.init();

  const app: Koa = createKoaServer({
    development: (config.get("debug_logging") as boolean),
    classTransformer: true,
    validation: { skipMissingProperties: true, validationError: { target: false, value: false } },
    controllers: (config.get("controllers") as string[]).map((item) => { return `${__dirname}/${item}`; }),
    authorizationChecker: JwtAuthenticate
  });

  app.use(SpaFallback("api", "/"));

  if (config.get("webpack_middleware.enabled")) {
    boostrapWebpackMiddleware(app, (__dirname + config.get("webpack_middleware.config_path")));
  }

  return app.use(serve(__dirname + '/public'));
}

export default {
  start: async function () {
    let app = await init();
    app.listen(config.get("bind_port"));
    return app;
  }
};
