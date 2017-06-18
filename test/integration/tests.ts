import app from "../../api/app";

before(async function () {
  // Start api server
  console.log("Starting api server...");
  return await app.start();
});
