import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as typeorm from 'typeorm';
import { createKoaServer } from "routing-controllers";
import SpaFallback from './middleware/SpaFallback';
import JwtAuthenticate from './middleware/JwtAuthenticator';
import boostrapWebpackMiddleware from './middleware/Webpack';
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
  authorizationChecker: JwtAuthenticate
});

app.use(SpaFallback("api", "/"));

if (!isProduction) {
  boostrapWebpackMiddleware(app, __dirname + "/../web/webpack.config.js");
}

app.use(serve(__dirname + '/public'));
app.listen(config.port);
