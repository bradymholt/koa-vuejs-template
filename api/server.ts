import * as Koa from 'koa';
import * as serve from 'koa-static';
import { createConnection as createDbConnection, ConnectionOptions, Connection } from 'typeorm';
import { createKoaServer } from "routing-controllers";
import SpaFallback from './middleware/SpaFallback';
import JwtAuthenticate from './middleware/JwtAuthenticator';
import boostrapWebpackMiddleware from './middleware/Webpack';
import { seedTestData } from "./db/Seeder";
import * as config from 'config';

createDbConnection(config.get("database") as ConnectionOptions).then((connection: Connection) => {
  if (config.get("database.seed_test_data")) {
    seedTestData();
  }
});

const app: Koa = createKoaServer({
  development: (config.get("debug_logging") as boolean),
  classTransformer: true,
  validation: { skipMissingProperties: true, validationError: { target: false, value: false } },
  controllers: [__dirname + "/controllers/*.ts"],
  authorizationChecker: JwtAuthenticate
});

app.use(SpaFallback("api", "/"));

if (config.get("webpack_middleware.enabled")) {
  boostrapWebpackMiddleware(app, (__dirname + config.get("webpack_middleware.config_path")));
}

app.use(serve(__dirname + '/public'));
app.listen(config.get("bind_port"));
