import chai = require('chai');
import request from "axios";
import { getConnection } from "typeorm";
import User from "../../api/models/User";

let assert = chai.assert;

describe('/auth/login', () => {
  it('it should login', async () => {
    let res = await request
      .post('api/auth/login', {
        email: "user@test.com",
        password: "P2ssw0rd!"
      });

    assert.equal(res.status, 200);
    assert.isDefined(res.data.token);
  });

  it('it should register a new user', async () => {
    let newEmail = "newUser@test.com";

    let res = await request
      .post('api/auth/register', {
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

