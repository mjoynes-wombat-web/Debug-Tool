require('dotenv').config(); // Require dotenv.

const chalk = require('chalk'); // Require chalk.

const time = new Date().toISOString(); // Get current date and time in ISO format.

// DEBUG LOG
module.exports.debug = (info) => { // Export to Express.
  // DEBUG MESSAGE CLASS
  class debugMsg {
    constructor(object) {
      this.logMsg = object.logMsg; // Message to log.
      this.method = object.method; // Access method.
      this.url = object.url; // Accessed URL.
      this.ip = object.ip; // Access by IP.
      this.level = object.level; // Message level.
    }
  }

  // AVAILABLE LEVELS
  //   INFO
  //   DEBUG
  //   ERROR

  const msg = new debugMsg(info); // Create message from debugMsg class.

  // Look through keys in the message.
  Object.keys(msg).forEach((key) => {
    if (msg[key] === undefined) { // If any of the keys are undefined, set them to empty strings.
      msg[key] = '';
    }
  });

  if (process.env.DEBUG) { // If there  DEBUG is in the env variables.
    // Style Console Message Function.
    const styleConsoleMsg = (t, m) => {
      const consoleMsg = m;
      consoleMsg.ip = chalk.cyan(consoleMsg.ip); // Make the IP cyan.
      if (consoleMsg.method !== '') { // If the method is not blank style it and the url.
        consoleMsg.method = chalk.bold.bgGreen.black(` ${consoleMsg.method} `);
        consoleMsg.url = chalk.underline.blue.bgWhite(` ${consoleMsg.url} `);
      } else { // Otherwise just style the url.
        consoleMsg.url = chalk.underline.blue(consoleMsg.url);
      }
      switch (consoleMsg.level) { // Check the level and style it accordingly.
        case 'INFO':
          consoleMsg.level = chalk.green(` ${consoleMsg.level} `);
          break;
        case 'DEBUG':
          consoleMsg.level = chalk.yellow(` ${consoleMsg.level} `);
          break;
        case 'ERROR': // If it is an error also style the message.
          consoleMsg.level = chalk.black.bgRed(` ${consoleMsg.level} `);
          consoleMsg.logMsg = chalk.red(consoleMsg.logMsg);
          break;
        default:
          break;
      }

      return consoleMsg;
    };

    const consoleMsg = styleConsoleMsg(time, msg); // Pass in the time and message to be styled.
    const consoleOutput = `${time}\t${consoleMsg.ip}\t${consoleMsg.method}${consoleMsg.url}\t${consoleMsg.level}\t${consoleMsg.logMsg}`; // Format the spacing for the message.
    // msg out determines which console to use
    const msgOut = (conMsg, level) => {
      switch (level) {
        case 'DEBUG':
          console.warn(conMsg);
          break;
        case 'ERROR':
          console.error(conMsg);
          break;
        case 'INFO':
          console.log(conMsg);
          break;
        default:
          console.error(`The message level ${level} is not valid.`);
          break;
      }
    };
    switch (process.env.DEBUG) { // Check the debug environment variable.
      case 'debug':
      case 'true': // If it is true or debug the output all messages to the console.
        msgOut(consoleOutput, info.level);
        break;
      case 'error': // If it is set to error then only output the error level messages.
        if (info.level === 'ERROR') {
          msgOut(consoleOutput, info.level);
          break;
        }
        break;
      case 'info': // If it is set to info the only output the error and info level messages.
        if (info.level === 'INFO' || info.level === 'ERROR') {
          msgOut(consoleOutput, info.level);
          break;
        }
        break;
      default:
        msgOut(`The debug level ${process.env.DEBUG} is incorrect. Please choose true, error, debug or info.`, 'ERROR');
        break;
    }
  }
};

/**
 * Daniel Cobb
 * 2-20-17
 * Version Updater
 */
// require file system
const fs = require('fs');

// class for update methods
class versionUpdate {
  // updatePackage updates the package.json file with the new version number
  // param ver is the updated version from updateAuto
  updatePackage(ver) {
    // read in the current package.json
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    // set the version var
    this.version = ver;
    // adjust the version on the old package.json
    this.oldPackage.version = this.version;
    // create a new package
    this.newPackage = this.oldPackage;
    // stringify the new package
    this.package = JSON.stringify(this.newPackage, null, 2);
    // set the status
    this.status = 'package.json updated.';
    // write to package.json
    fs.writeFile('package.json', this.package, (err) => {
      if (err) {
        // if there is an error change the status to that error
        this.status = err;
      }
    });
    // return the status
    return this.status;
  }
  // updateManual returns the new version number
  // params: ver: current version, rel: release type
  updateManual(ver, rel) {
    // split the current version into an array
    this.current = ver.split('.');
    // set n to nothing
    this.n = '';
    // switch based on release type
    switch (rel) {
      // if patch
      case 'patch':
        // set n to patch + 1
        this.n = parseInt(this.current[2], 10) + 1;
        // set the new version number
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.n}`;
        break;
      // if minor
      case 'minor':
        // set n to minor + 1
        this.n = parseInt(this.current[1], 10) + 1;
        // set the new version number
        this.updateVersion = `${this.current[0]}.${this.n}.0`;
        break;
      // if major
      case 'major':
        // set n to major + 1 minor/patch = 0
        this.n = parseInt(this.current[0], 10) + 1;
        // set the new version
        this.updateVersion = `${this.n}.0.0`;
        break;
      // if none of the above
      default:
        // return invalid
        return 'Invalid release type.';
    }
    // return the updated version number
    return this.updateVersion;
  }
  // updateAuto automatically finds and updates the version number and rewrites package.json
  // params: rel: release type
  updateAuto(rel) {
    // read the old package
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    // split the old version into an array
    this.current = this.oldPackage.version.split('.');
    // set n to nothing
    this.n = '';
    switch (rel) {
      // if patch update patch and set new version number
      case 'patch':
        this.n = parseInt(this.current[2], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.n}`;
        break;
      // if minor update minor and set new version number
      case 'minor':
        this.n = parseInt(this.current[1], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.n}.0`;
        break;
      // if major update major set minor&patch to 0 update version number
      case 'major':
        this.n = parseInt(this.current[0], 10) + 1;
        this.updateVersion = `${this.n}.0.0`;
        break;
      // if none of the above invalid release type
      default:
        return 'Invalid release type.';
    }
    // send all this on to the updatePackage method to rewrite package.json
    const update = new versionUpdate();
    const status = update.updatePackage(this.updateVersion);
    return status;
  }
}

exports.updateVer = new versionUpdate();
