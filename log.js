require('dotenv').config(); // Require dotenv.

const fs = {
  stat: require('fs').stat,
  appendFile: require('fs').appendFile,
};

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

  const errorLog = './logs/error.log'; // Error log location.
  let debugLogMsg; // Variable to hold the formatted error log message.

  if (msg.url === '') { // If the URL is empty.
    if (msg.ip.length < 10) { // If the ip is less than 10 characters, format the message this way.
      debugLogMsg = `${time}\t${msg.ip}\t\t${msg.method}\t${msg.url}\t\t${msg.level}\t${msg.logMsg}`;
    } else { // Otherwise if the ip is longer than 10 characters, format the message this way.
      debugLogMsg = `${time}\t${msg.ip}\t${msg.method}\t${msg.url}\t\t${msg.level}\t${msg.logMsg}`;
    }
  } else if (msg.url.length < 16) { // Otherwise if the URL is less than 16 characters.
    if (msg.ip.length < 10) { // If the ip is less than 10 characters, format the message this way.
      debugLogMsg = `${time}\t${msg.ip}\t\t${msg.method}\t${msg.url}\t\t${msg.level}\t${msg.logMsg}`;
    } else { // Otherwise if the ip is longer than 10 characters, format the message this way.
      debugLogMsg = `${time}\t${msg.ip}\t${msg.method}\t${msg.url}\t\t${msg.level}\t${msg.logMsg}`;
    }
    // Otherwise if the IP is less than 10 characters, format the message this way.
  } else if (msg.ip.length < 10) {
    debugLogMsg = `${time}\t${msg.ip}\t\t${msg.method}\t${msg.url}\t${msg.level}\t${msg.logMsg}`;
  } else { // Otherwise format the message this way.
    debugLogMsg = `${time}\t${msg.ip}\t${msg.method}\t${msg.url}\t${msg.level}\t${msg.logMsg}`;
  }

  // Check to see if there is an error when checking the status of the error log.
  fs.stat(errorLog, (err) => {
    console.log(err);
    if (err) {
      if (err.code === 'ENOENT') { // Otherwise if the error is a non existent file, write the headers to the log.
        fs.appendFile(errorLog, 'TIME\t\tIP\t\tMETHOD\tURL\t\tLEVEL\tMESSAGE\n', (writeErr) => { // Throw an error if there is a write error.
          if (writeErr) throw writeErr;
        });
      }
    }
  });

  // Write the message to the log.
  fs.appendFile(errorLog, `${debugLogMsg}\n`, (writeErr) => { // Throw an error if there is a write error.
    if (writeErr) throw writeErr;
  });

  if (process.env.DEBUG) { // If there  DEBUG is in the env variables.
    //
    const styleConsoleMsg = (t, m) => {
      const consoleMsg = m;
      consoleMsg.ip = chalk.cyan(consoleMsg.ip);
      if (consoleMsg.method !== '') {
        consoleMsg.method = chalk.bold.bgGreen.black(` ${consoleMsg.method} `);
        consoleMsg.url = chalk.underline.blue.bgWhite(` ${consoleMsg.url} `);
      } else {
        consoleMsg.url = chalk.underline.blue(consoleMsg.url);
      }

      switch (consoleMsg.level) {
        case 'INFO':
          consoleMsg.level = chalk.green(` ${consoleMsg.level} `);
          break;
        case 'DEBUG':
          consoleMsg.level = chalk.yellow(` ${consoleMsg.level} `);
          break;
        case 'ERROR':
          consoleMsg.level = chalk.black.bgRed(` ${consoleMsg.level} `);
          consoleMsg.logMsg = chalk.red(consoleMsg.logMsg);
          break;
        default:
          break;
      }

      return consoleMsg;
    };

    const consoleMsg = styleConsoleMsg(time, msg);
    const consoleOutput = `${time}\t${consoleMsg.ip}\t${consoleMsg.method}${consoleMsg.url}\t${consoleMsg.level}\t${consoleMsg.logMsg}`;

    switch (process.env.DEBUG) {
      case 'debug':
      case 'true':
        console.log(consoleOutput);
        break;
      case 'error':
        if (info.level === 'ERROR') {
          console.log(consoleOutput);
        }
        break;
      case 'info':
        if (info.level === 'INFO' || info.level === 'ERROR') {
          console.log(consoleOutput);
        }
        break;
      default:
        console.log(`The debug level ${process.env.DEBUG} is incorrect. Please choose true, error, debug or info.`);
        break;
    }
  }
};
