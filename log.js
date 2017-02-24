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
    const msgOut = (conMsg) => {
      switch (conMsg.level) {
        case 'debug':
          console.log(consoleOutput);
          break;
        case 'ERROR':
          console.error(consoleOutput);
          break;
        case 'INFO':
          console.warn(consoleOutput);
          break;
        default:
          console.log(consoleOutput);
          break;
      }
    };
    switch (process.env.DEBUG) { // Check the debug environment variable.
      case 'debug':
      case 'true': // If it is true or debug the output all messages to the console.
        msgOut(consoleMsg);
        break;
      case 'error': // If it is set to error then only output the error level messages.
        if (info.level === 'ERROR') {
          msgOut(consoleMsg);
          break;
        }
        break;
      case 'info': // If it is set to info the only output the error and info level messages.
        if (info.level === 'INFO' || info.level === 'ERROR') {
          msgOut(consoleMsg);
          break;
        }
        break;
      default:
        console.log(`The debug level ${process.env.DEBUG} is incorrect. Please choose true, error, debug or info.`);
        break;
    }
  }
};
