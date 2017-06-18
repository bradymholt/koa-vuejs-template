import chai = require('chai');
import request from "axios";
import { getConnection } from "typeorm";
import User from "../../api/models/User";

let assert = chai.assert;

describe('/auth/login', () => {
  let existingEmail = "user@test.com";
  let newEmail = "newUser@test.com";

  it('it should login', async () => {
    let res = await request
      .post('api/auth/login', {
        email: existingEmail,
        password: "P2ssw0rd!"
      });

    assert.equal(res.status, 200);
    assert.isDefined(res.data.token);
  });

  it('it should register a new user', async () => {
    let res = await request
      .post('api/auth/register', {
        email: newEmail,
        password: "P2ssw0rd!"
      });

    assert.equal(res.status, 204);
  });

  it('it should not allow registration for existing email', async () => {
    let res = await request
      .post('api/auth/register', {
        email: existingEmail,
        password: "P2ssw0rd!"
      });

    assert.equal(res.status, 400);
    assert.equal(res.data.errors[0].property, "email");
  });

  after(async () => {
    // Delete the new user
    let userRepo = await getConnection().getRepository(User);
    let user = await userRepo.findOne({ email: newEmail })
    await userRepo.remove(user);
  });
});

