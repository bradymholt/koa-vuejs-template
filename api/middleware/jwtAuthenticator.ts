import { Action } from "routing-controllers";
import { getConnection } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import Contact from "../models/Contact";

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
      action.context.state.currentUserId = decodedToken.userId;
      isAuthorized = (decodedToken.userId);
    }
    catch (err) {
      isAuthorized = false;
    }
  }

  return isAuthorized;
};
