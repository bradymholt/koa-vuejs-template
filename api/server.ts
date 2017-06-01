import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as bodyParser from 'koa-body-parser';
import * as jwt from 'jsonwebtoken';
import db from './init/db';
var config = require('./config.json');

const app = new Koa();
const router = Router();

router.prefix(`/api`);

router
    .post('/auth/login', function (ctx, next) {
        let credentials = ctx.request.body;
        if (credentials.username === "user@test.com" && credentials.password === "P2ssw0rd!") {
            ctx.status = 200;
            ctx.body = {
                token: jwt.sign({
                    role: 'user',
                }, config.jwtKey)
            };
        } else {
            ctx.status = 401;
            ctx.body = {
                message: 'Authentication Failed',
            };
        }

        return ctx;
    })
    .get('/contacts', async (ctx, next) => {
        let contacts = await db.contacts.findAsync();
        let contactsWithId = contacts.map((c) => {
            return Object.assign(c.body, { id: c.id })
        });
        ctx.body = contactsWithId;
    })
    .get('/contacts/search', async (ctx, next) => {
        let results = await db.contacts.findDocAsync({
            or: [
                { "firstName ilike": `%${ctx.request.query.q}%` },
                { "lastName ilike": `%${ctx.request.query.q}%` }
            ]
        });
        ctx.body = results;
        ctx.status = results.length ? 200 : 404;
    })
    .get('/contacts/:id', async (ctx, next) => {
        let contact = await db.contacts.findDocAsync({ id: ctx.params.id });
        ctx.body = contact;
        ctx.status = contact ? 200 : 404;
    })
    .post('/contacts', async (ctx, next) => {
        let newContact = await db.contacts.saveDocAsync(ctx.request.body);
        ctx.body = newContact;
        ctx.status = 201;
    })
    .put('/contacts/:id', async (ctx, next) => {
        let contact = ctx.request.body;
        contact.id = ctx.params.id;
        let updatedContact = await db.contacts.saveDocAsync(contact);
        ctx.body = updatedContact;
        ctx.status = updatedContact ? 200 : 404;
    })
    .del('/contacts/:id', async (ctx, next) => {
        let result = await db.contacts.destroyAsync({ id: ctx.params.id });
        ctx.status = result.length ? 204 : 404;
    });

app.use(serve(__dirname + '/public')).
    use(bodyParser()).
    use(router.routes()).
    use(router.allowedMethods());

app.listen(config.port);
