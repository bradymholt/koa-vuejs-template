import "reflect-metadata";
import * as Koa from "koa";
import { JsonController, Param, Body, Get, Post, Put, Delete, OnUndefined, OnNull, NotFoundError, UnauthorizedError, QueryParam, Redirect, BadRequestError } from "routing-controllers";
import { Ctx } from "routing-controllers/decorator/Ctx";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { getConnection } from "typeorm";

import AuthCredentials from "../models/AuthCredentials";
import User from "../models/User";
import EmailHelper from "../helpers/EmailHelper";
import AuthCredentialsNew from "../models/AuthCredentialsNew";

@JsonController("/api/auth")
export default class ContactController {
  private getRepo() {
    return getConnection().getRepository(User);
  }

  @Post("/login")
  async login( @Body() credentials: AuthCredentials) {
    let config = require('../config.json');
    let invalidCredentialsMessage = "The email or password is invalid!";

    let user = await this.getRepo().createQueryBuilder("u").
      where("u.email=:email", { email: credentials.email }).
      getOne();

    if (!user) {
      throw new BadRequestError(invalidCredentialsMessage);
    }

    if (await bcrypt.compare(credentials.password, user.hashedPassword)) {
      if (!user.emailConfirmed) {
        throw new BadRequestError("You must have a confirmed email to log in.");
      }

      let token = jwt.sign({ userId: '1' }, config.jwtKey, { expiresIn: '1h' });
      return { token };
    } else {
      throw new BadRequestError(invalidCredentialsMessage);
    }
  }

  @Post("/register")
  @OnUndefined(204)
  async register( @Body() credentials: AuthCredentialsNew, @Ctx() ctx: Koa.Context) {
    let config = require('../config.json');

    // Create a new user
    let newUser = new User()
    newUser.email = credentials.email;
    let hashedPassword = await bcrypt.hash(credentials.password, 3);
    newUser.hashedPassword = hashedPassword;
    await this.getRepo().persist(newUser);

    // Send confirmation email
    let confirmEmailToken = jwt.sign({ userId: newUser.id }, config.jwtKey, { expiresIn: '20m' });
    let emailConfirmUrl = `${config.frontEndUrl}/api/auth/confirm?token=${confirmEmailToken}`;
    await EmailHelper.sendEmail(newUser.email, "Please confirm your account", `Please confirm your account by clicking this <a href=\"${emailConfirmUrl}\">link</a>.`);
  }

  @Get("/confirm")
  async confirm( @QueryParam("token") token: string, @Ctx() ctx: Koa.Context) {
    let config = require('../config.json');
    let redirectUrl = null;

    try {
      let decodedToken = jwt.verify(token, config.jwtKey);
      let repo = this.getRepo();
      let user = await repo.findOneById(decodedToken.userId);
      user.emailConfirmed = true;
      repo.persist(user);

      redirectUrl = "/?confirmed=1";
    }
    catch (err) {
      redirectUrl = "/error/email-confirm";
    }

    ctx.redirect(redirectUrl);
  }
}
