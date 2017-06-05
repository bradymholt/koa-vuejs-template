import * as Koa from 'koa';
import * as serve from 'koa-static';
import { createKoaServer } from "routing-controllers";
import * as typeorm from 'typeorm';
import * as webpack from 'webpack';
import * as koaWebpackDevMiddleware from 'koa-webpack-dev-middleware';
import * as koaWebpackHotMiddleware from 'koa-webpack-hot-middleware';
import spaFallback from './middleware/SpaFallback';
import jwtAuthenticate from './middleware/JwtAuthenticator';
import { seedDevelopmentData } from "./db/Seeder";

let config = require('./config.json')
let isProduction = process.env.NODE_ENV === "production";

typeorm.createConnection("default", __dirname + "/ormconfig.json").then(() => {
  if (!isProduction) {
    seedDevelopmentData();
  }
});

const app: Koa = createKoaServer({
  development: !isProduction,
  classTransformer: true,
  validation: { skipMissingProperties: true, validationError: { target: false, value: false } },
  controllers: [__dirname + "/controllers/*.ts"],
  authorizationChecker: jwtAuthenticate
});
``
if (!isProduction) {
  let webpackConfig = require("../web/webpack.config.js");
  let compiler = webpack([webpackConfig]);
  app.use(koaWebpackDevMiddleware(compiler)).
    use(koaWebpackHotMiddleware(compiler));
}

app.use(spaFallback("api", "/")).
  use(serve(__dirname + '/public')).
  listen(config.port);
