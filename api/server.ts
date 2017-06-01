import * as Koa from 'koa';
import * as serve from 'koa-static';
import { createKoaServer } from "routing-controllers";
import * as typeorm from 'typeorm';
import spaFallback from './middleware/spaFallback';
import jwtAuthenticate from './middleware/jwtAuthenticator';

let isProduction = process.env.NODE_ENV === "production";

typeorm.createConnection("default", __dirname + "/ormconfig.json");

const app: Koa = createKoaServer({
    development: !isProduction,
    classTransformer: true,
    validation: { skipMissingProperties: true, validationError: { target: false, value: false } },
    controllers: [__dirname + "/controllers/*.ts"],
    authorizationChecker: jwtAuthenticate
});

app.use(spaFallback("api", "/")).
    use(serve(__dirname + '/public')).
    listen(5000);
