"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serve = require("koa-static");
const routing_controllers_1 = require("routing-controllers");
const typeorm = require("typeorm");
const spaFallback_1 = require("./middleware/spaFallback");
let isProduction = process.env.NODE_ENV === "production";
typeorm.createConnection("default", __dirname + "/ormconfig.json");
const app = routing_controllers_1.createKoaServer({
    development: !isProduction,
    classTransformer: true,
    validation: { skipMissingProperties: true },
    controllers: [__dirname + "/controllers/*.ts"]
});
app.use(spaFallback_1.default("api", "/")).
    use(serve(__dirname + '/public')).
    listen(5000);
//# sourceMappingURL=server.js.map