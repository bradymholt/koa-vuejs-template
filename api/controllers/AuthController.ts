import "reflect-metadata";
import { JsonController, Param, Body, Get, Post, Put, Delete, OnUndefined, OnNull, NotFoundError, UnauthorizedError, QueryParam, Redirect, BadRequestError } from "routing-controllers";
import * as jwt from 'jsonwebtoken';
import AuthCredentials from '../models/AuthCredentials';
import { getConnection } from 'typeorm';
import User from "../models/User";
import * as bcrypt from "bcrypt";

@JsonController("/api/auth")
export default class ContactController {
    private getRepo() {
        return getConnection().getRepository(User);
    }

    @Post("/login")
    async login( @Body() credentials: AuthCredentials) {
        let config = require('../config.json');

        let user = await this.getRepo().createQueryBuilder("u").
            where("u.email=:email", { email: credentials.email }).
            getOne();

        if (!user) {
            throw new BadRequestError("Credentials invalid");
        }

        if (await bcrypt.compare(credentials.password, user.hashedPassword)) {
            let token = jwt.sign({
                userId: '1',
                role: 'user',
            }, config.jwtKey, { expiresIn: '1h' });

            return { token };
        } else {
            throw new BadRequestError("Credentials invalid");
        }
    }

    @Post("/register")
    @OnUndefined(204)
    async register( @Body() credentials: AuthCredentials) {
        let config = require('../config.json');
        let hashedPassword = await bcrypt.hash(credentials.password, 3);

        let newUser = new User()
        newUser.email = credentials.email;
        newUser.hashedPassword = hashedPassword;
        await this.getRepo().persist(newUser);

        let confirmEmailToken = jwt.sign({
            userId: newUser.id,
        }, config.jwtKey, { expiresIn: '20m' });

        //TODO: sent confirmation email here
    }

    @Get("/confirm")
    @Redirect(":redirectUrl")
    async confirm( @QueryParam("token") token: string) {
        let config = require('../config.json');
        let decodedToken = jwt.verify(token, config.jwtKey);
        let redirectUrl = "/error/email-confirm";
        if (decodedToken) {
            let repo = this.getRepo();
            let user = await repo.findOneById(decodedToken.userId);
            user.emailConfirmed = true;
            repo.persist(user);

            redirectUrl = "/?confirmed=1";
        }

        return { redirectUrl };
    }
}
