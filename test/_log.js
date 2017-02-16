// Pull in the requirements.
const rewire = require('rewire');
const expect = require('chai').expect;
const sinon = require('sinon');
// Pull in the debug log with rewire.
const log = rewire('../log');
// Setup a debug message class.
class debugMsg {
  constructor(object) {
    this.logMsg = object.logMsg; // Message to log.
    this.method = object.method; // Access method.
    this.url = object.url; // Accessed URL.
    this.ip = object.ip; // Access by IP.
    this.level = object.level; // Message level.
  }
}
// Compare Log Message Function.
// Accepts the sent messages, the expected messages and the format function.
function compareLogMsg(sent, expected, format) {
  const logStrings = [];  // An array to hold the log strings minus the time.
  // For each log string pull out the substring without the time and add it to the log strings
  // array.
  sent.forEach((args) => {
    logStrings.push(args[1].substring(args[1].indexOf('\t') + 1));
  });
  // For each messages that is expected.
  Object.keys(expected).forEach((key, index) => {
    // Create a new message object from the debug message class.
    const expectedMsg = new debugMsg(expected[key]);
    // For each key in the expected message.
    Object.keys(expectedMsg).forEach((k) => {
      // If it is undefined set it to an empty string.
      if (expectedMsg[k] === undefined) {
        expectedMsg[k] = '';
      }
    });
    // Format the message with the format function provided.
    const msg = format(expectedMsg);
    // Pull in the results message based on the index we are on.
    const resultMsg = logStrings[index];
    // Expect the two messages to match.
    expect(msg).to.equal(resultMsg);
  });
}
// Debug Logging Utility Tests.
describe('Debug Logging Utility', () => {
  // Before each test.
  beforeEach(() => {
    // Set console.log to a sinon.spy.
    this.console = {
      log: sinon.spy(),
    };
    // Set fs stat and appendFile to a sinon spy.
    this.fs = {
      stat: sinon.spy(),
      appendFile: sinon.spy(),
    };
    // Set the following variables from log to the sinon spies above.
    log.__set__('fs.stat', this.fs.stat);
    log.__set__('fs.appendFile', this.fs.appendFile);
    log.__set__('console', this.console);
  });
  // Test Log Levels.
  describe('TESTING LOG LEVELS', () => {
    // Before Each Test/
    beforeEach(() => {
      // Log level message objects for testing.
      this.logLvlMessages = {
        info: {
          logMsg: 'Sent an INFO log message to the console.',
          method: 'METHOD',
          url: 'http://www.url.com',
          ip: 'IP ADDRESS',
          level: 'INFO',
        },
        debug: {
          logMsg: 'Sent a DEBUG log message to the console.',
          method: 'METHOD',
          url: 'http://www.url.com',
          ip: 'IP ADDRESS',
          level: 'DEBUG',
        },
        error: {
          logMsg: 'Sent a ERROR log message to the console.',

          url: 'http://www.url.com',
          ip: 'IP ADDRESS',
          level: 'ERROR',
        },
      };
    });
    // Tests for log level set to true.
    describe('Log Level Set to true.', () => {
      // Before each set the debug level to true.
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'true');
      });
      // All messages should be logged to the console.
      it('Log All Level Messages to the Console.', () => {
        const t = this; // Variable to persist this.

        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        // Run the compare log messages function to compare the expected and actual messages.
        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t${expected.level}\t${expected.logMsg}\n`);
        // Expect the console, fs.stat and fs.appendFile to be run on all 3 messages.
        expect(t.console.log.callCount).to.equal(3);
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
    // Tests for log level set to debug.
    describe('Log Level Set to debug.', () => {
      // Before each, set the debug level to debug.
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'debug');
      });
      // All messages should be logged to the console.
      it('Log All Level Messages to the Console.', () => {
        const t = this;  // Variable to persist this.

        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        // Run the compare log messages function to compare the expected and actual messages.
        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t${expected.level}\t${expected.logMsg}\n`);
        // Expect the console, fs.stat and fs.appendFile to be run on all 3 messages.
        expect(t.console.log.callCount).to.equal(3);
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
    // Tests for log level set to info.
    describe('Log Level Set to info.', () => {
      // Before each, set the debug level to info.
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'info');
      });
      // Only the info and error level messages should be logged to the console.
      it('Log Only INFO and ERROR level messages to Console.', () => {
        const t = this; // Variable to persist this.

        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        // Run the compare log messages function to compare the expected and actual messages.
        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t${expected.level}\t${expected.logMsg}\n`);
        // Expect the console to only be run twice.
        expect(t.console.log.callCount).to.equal(2);
        // Expect fs.stat and fs.appendFile to be run all 3 times.
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
    // Tests for log level set to error.
    describe('Log Level Set to error.', () => {
      // Before each, set the debug level to error.
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'error');
      });
      // Only the error level messages should be logged to the console.
      it('Log Only ERROR level messages to Console.', () => {
        const t = this; // Variable to persist this.

        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        // Run the compare log messages function to compare the expected and actual messages.
        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t${expected.level}\t${expected.logMsg}\n`);
        // Expect the console to only be run once.
        expect(t.console.log.callCount).to.equal(1);
        // Expect fs.stat and fs.appendFile to be run all 3 times.
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
    // Tests for log level set to an invalid option.
    describe('Log Level Set to Invalid Option.', () => {
      // Before each, set the log level to invalid.
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'invalid');
      });
      // The invalid debug message should be logged to console.
      it('Log Invalid Debug Level to Console.', () => {
        const t = this; // Variable to persist this.

        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.

        // Expect console.log, fs.stat and fs.appendFIle to be run 3 times.
        expect(t.console.log.callCount).to.equal(3);
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
        // Make sure that the message each time matches the debug level invalid message.
        t.console.log.args.forEach((args) => {
          expect(args[0].substring(args[0].indexOf('\t') + 1)).to.equal('The debug level invalid is incorrect. Please choose true, error, debug or info.');
        });
      });
    });
  });
  // Testing the various formats.
  describe('TESTING FORMATS', () => {
    // Test to make sure empty fields are handled properly.
    describe('Testing Empty Field Handling', () => {
      // Replace undefined with spaces.
      it('Replace undefined with spaces.', () => {
        const t = this; // Variable to persist this.
        // Object to hold test debug message.
        const logMsg = {
          test: {
            logMsg: 'Sent a ERROR log message to the console.',
            url: 'http://www.url.com',
            ip: 'IP ADDRESS',
            level: 'ERROR',
          },
        };
        // Run the debug log with an empty field.
        log.debug(logMsg.test);
        // Make sure it matches the proper formatting.
        compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t${expected.level}\t${expected.logMsg}\n`);
        // Expect console.log, fs.stat and fs.appendFile to be run once.
        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(1);
        expect(t.fs.appendFile.callCount).to.equal(1);
      });
    });
    // Test empty urls with short ips.
    describe('Testing empty url with short ip.', () => {
      it('Formatted for empty url and short ip.', () => {
        const t = this; // Variable to persist this.
        // Object to hold test debug message.
        const logMsg = {
          test: {
            logMsg: 'Sent a ERROR log message to the console.',
            method: 'METHOD',
            ip: 'SHORT',
            level: 'ERROR',
          },
        };
        // Run the debug log with an empty url and short ip.
        log.debug(logMsg.test);
        // Make sure it matches the proper formatting.
        compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);
        // Expect console.log, fs.stat and fs.appendFile to be run once.
        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(1);
        expect(t.fs.appendFile.callCount).to.equal(1);
      });
    });
    // Test empty urls with regular ips.
    describe('Testing empty url with regular ip.', () => {
      it('Formatted for empty url and regular ip.', () => {
        const t = this; // Variable to persist this.
        // Object to hold test debug message.
        const logMsg = {
          test: {
            logMsg: 'Sent a ERROR log message to the console.',
            method: 'METHOD',
            ip: 'IP ADDRESS',
            level: 'ERROR',
          },
        };
        // Run the debug log with an empty url and regular ip.
        log.debug(logMsg.test);
        // Make sure it matches the proper formatting.
        compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);
        // Expect console.log, fs.stat and fs.appendFile to be run once.
        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(1);
        expect(t.fs.appendFile.callCount).to.equal(1);
      });
    });
    // Test short urls with short ip.
    describe('Testing short url with short ip.', () => {
      it('Formatted for short url and short ip.', () => {
        const t = this; // Variable to persist this.
        // Object to hold test debug messages.
        const logMsg = {
          test: {
            logMsg: 'Sent a ERROR log message to the console.',
            method: 'METHOD',
            ip: 'IP',
            url: 'URL',
            level: 'ERROR',
          },
        };
        // Run the debug log with a short url and short ip.
        log.debug(logMsg.test);
        // Make sure it matches the proper formatting.
        compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);
        // Expect console.log, fs.stat and fs.appendFile to be run once.
        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(1);
        expect(t.fs.appendFile.callCount).to.equal(1);
      });
    });
    // Test short urls with regular ips.
    describe('Testing short url with regular ip.', () => {
      it('Formatted for short url and regular ip.', () => {
        const t = this; // Variable to persist this.
        // Object to hold test debug messages.
        const logMsg = {
          test: {
            logMsg: 'Sent a ERROR log message to the console.',
            method: 'METHOD',
            ip: 'IP ADDRESS',
            url: 'URL',
            level: 'ERROR',
          },
        };
        // Run the debug log with a short url and regular ip.
        log.debug(logMsg.test);
        // Make sure it matches the proper formatting.
        compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);
        // Expect console.log, fs.stat and fs.appendFile to be run once.
        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(1);
        expect(t.fs.appendFile.callCount).to.equal(1);
      });
    });
    // Test regular url with short ip.
    describe('Testing regular url with short ip.', () => {
      it('Formatted for regular url and short ip.', () => {
        const t = this; // Variable to persist this.
        // Object to hold test debug messages.
        const logMsg = {
          test: {
            logMsg: 'Sent a ERROR log message to the console.',
            method: 'METHOD',
            ip: 'IP',
            url: 'http://www.url.com',
            level: 'ERROR',
          },
        };
        // Run the debug log with a regular url and short ip.
        log.debug(logMsg.test);
         // Make sure it matches the proper formatting.
        compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t\t${expected.method}\t${expected.url}\t${expected.level}\t${expected.logMsg}\n`);
        // Expect console.log, fs.stat and fs.appendFile to be run once.
        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(1);
        expect(t.fs.appendFile.callCount).to.equal(1);
      });
    });
    // Test no chalk formatting.
    describe('Testing no chalk formatting.', () => {
      it('Formatted for no level.', () => {
        const t = this; // Variable to persist this.
        // Object to hold test debug message.
        const logMsg = {
          test: {
            logMsg: 'Sent a ERROR log message to the console.',
            method: 'METHOD',
            ip: 'IP ADDRESS',
            url: 'http://www.url.com',
          },
        };
        // Run the debug log with no chalk formatting.
        log.debug(logMsg.test);
        // Make sure it matches the proper formatting.
        compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t${expected.level}\t${expected.logMsg}\n`);
        // Expect console.log, fs.stat and fs.appendFile to be run once.
        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(1);
        expect(t.fs.appendFile.callCount).to.equal(1);
      });
    });
  });
});

