/*
  A helper script to mock a browser DOM with jsdom to enable testing.
  This helper is intended to be required by mocha using the --require option so that the DOM can mocked before running the tests.
  Reference: https://github.com/zinserjan/mocha-webpack/blob/master/docs/guides/jsdom.md
*/
const jsdom = require("jsdom").jsdom;

global.document = jsdom("");
global.window = document.defaultView;
window.console = global.console;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js"
};
