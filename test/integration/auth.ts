import chai = require('chai');
let assert = chai.assert;

import { getConnection } from "typeorm";
import User from "../../api/models/User";
import * as request from "superagent";

describe('/auth/login', () => {
  it('it should login', async () => {
    let res = await request
      .post('http://localhost:5000/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: "user@test.com",
        password: "P2ssw0rd!"
      });

    assert.equal(res.status, 200);
    assert.isDefined(res.body.token);
  });

  it('it should register a new user', async () => {
    let newEmail = "newUser@test.com";

    let res = await request
      .post('http://localhost:5000/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email: newEmail,
        password: "P2ssw0rd!"
      });

    assert.equal(res.status, 204);

    //Delete the new user
    let userRepo = await getConnection().getRepository(User);
    let user = await userRepo.findOne({ email: newEmail })
    await userRepo.remove(user);
  });
});

