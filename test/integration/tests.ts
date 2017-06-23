import app from "../../api/app";
import axios from "axios";

// Global axios defaults
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.validateStatus = function(status) {
  return status < 500; // Reject only if the status code is greater than or equal to 500
};

before(async function() {
  // Start api server
  console.log("Starting api server...");
  return await app.start();
});
