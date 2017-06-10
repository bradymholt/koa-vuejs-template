import * as path from "path";

// Set cwd to test directory first so that node-config will be able to find config
process.chdir(path.join(__dirname, "../../api/"));

import app from "../../api/app";
import * as mocha from "mocha";
import * as chai from "chai";
import ChaiHttp = require('chai-http');

chai.use(ChaiHttp);
let assert = chai.assert;

// Start api server
app.start();

// Tests
describe('/auth/login', () => {
  it('it should login', (done) => {
    chai.request("http://localhost:5000")
      .post('/api/auth/login')
      .send({
        email: "user@test.com",
        password: "P2ssw0rd!"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isDefined(res.body.token);
        done();
      });
  });
});

