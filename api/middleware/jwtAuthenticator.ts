import { Action } from "routing-controllers";
import { getConnection } from 'typeorm';
import Contact from "../models/Contact";
import * as jwt from 'jsonwebtoken';

export default async function authenticate(action: Action, roles: string[]) {
    let isAuthorized = false;
    let token = action.request.headers["authorization"];
    if (!token) {
        isAuthorized = false;
    }
    else {
        const config = require('../config.json');
        let decodedToken: any = null;
        token = token.replace("Bearer ", "");

        try {
            decodedToken = jwt.verify(token, config.jwtKey);
            const repo = getConnection().getRepository(Contact);
            const user = await repo.findOneById(decodedToken.userId);
            if (user) {
                action.context.state.user = user;
                isAuthorized = true;
            }
        }
        catch (err) {
            isAuthorized = false;
        }
    }

    return isAuthorized;
};
