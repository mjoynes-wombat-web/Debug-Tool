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
    if (err) { // If there is an error
      if (err.code === 'ENOENT') { // If the error is a non existent file, write the headers to the log.
        fs.appendFile(errorLog, 'TIME\t\tIP\t\tMETHOD\tURL\t\tLEVEL\tMESSAGE\n', (writeErr) => { // Throw an error if there is a write error.
          if (writeErr) throw writeErr;
          else return true;
        });
        return true;
      }
      return err.code;
    }
    return false;
  });

  // Write the message to the log.
  fs.appendFile(errorLog, `${debugLogMsg}\n`, (writeErr) => { // Throw an error if there is a write error.
    if (writeErr) throw writeErr;
    return true;
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

    switch (process.env.DEBUG) { // Check the debug environment variable.
      case 'debug':
      case 'true': // If it is true or debug the output all messages to the console.
        console.log(consoleOutput);
        break;
      case 'error': // If it is set to error then only output the error level messages.
        if (info.level === 'ERROR') {
          console.log(consoleOutput);
        }
        break;
      case 'info': // If it is set to info the only output the error and info level messages.
        if (info.level === 'INFO' || info.level === 'ERROR') {
          console.log(consoleOutput);
        }
        break;
      default:
        // If the level is not set to one of the values above then output the incorrect value
        // message.
        console.log(`The debug level ${process.env.DEBUG} is incorrect. Please choose true, error, debug or info.`);
        break;
    }
  }
};
