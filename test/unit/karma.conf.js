var path = require("path");
let buildDir = path.join(__dirname, "build");

// Set cwd to test directory
process.chdir(__dirname);

/* Run webpack build first
    - This will output assets to {buildDir}/.  There are more elegant ways to do this
      like using webpack dev middleware but getting sourcemap support (particularly
      with integrated debugging in VSCode) requires all sorts of crazy hacks.
      Running the webpack build with the CLI makes things much easier.
*/
process.stdout.write("Running webpack...");
const execSync = require('child_process').execSync;
execSync(`webpack --output-path="${buildDir}"`);
process.stdout.write("done!\n");

module.exports = function (config) {
  config.set({
    browsers: ['Chrome_custom'],
    customLaunchers: {
      'Chrome_custom': {
        base: 'Chrome',
        flags: [
          '--remote-debugging-port=9222'
        ]
      }
    },
    frameworks: ['mocha'],
    reporters: ['spec'],
    basePath: buildDir,
    files: [
      "index.js",
      { pattern: '*.map', watched: false, included: false, served: true },
    ],
    singleRun: true
  })
}
