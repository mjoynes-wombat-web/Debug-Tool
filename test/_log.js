const rewire = require('rewire');
const expect = require('chai').expect;
const sinon = require('sinon');

const log = rewire('../log');
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
      this.console = {
        log: sinon.spy(),
      };
      log.__set__('console', this.console);
    });
    // Tests for log level set to true.
    describe('Log Level Set to true.', () => {
      // Before each set the debug level to true.
      // All messages should be logged to the console.
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'true');
      });
      it('Log All Level Messages to the Console.', () => {
        const t = this; // Variable to persist this.
        // Expect the console, fs.stat and fs.appendFile to be run on all 3 messages.
        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        expect(t.console.log.callCount).to.equal(3);
      });
    });
    // Tests for log level set to debug.
    describe('Log Level Set to debug.', () => {
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'debug');
      });
      // All messages should be logged to the console.
      it('Log All Level Messages to the Console.', () => {
        const t = this;  // Variable to persist this.
        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        expect(t.console.log.callCount).to.equal(3);
      });
    });
    // Tests for log level set to info.
    describe('Log Level Set to info.', () => {
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'info');
      });
      // Before each, set the debug level to info.
      // Only the info and error level messages should be logged to the console.
      it('Log Only INFO and ERROR level messages to Console.', () => {
        const t = this; // Variable to persist this.
        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        expect(t.console.log.callCount).to.equal(2);
      });
    });
    // Tests for log level set to error.
    describe('Log Level Set to error.', () => {
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'error');
      });
      // Before each, set the debug level to error.
      // Only the error level messages should be logged to the console.
      it('Log Only ERROR level messages to Console.', () => {
        const t = this; // Variable to persist this.
        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        expect(t.console.log.callCount).to.equal(1);
      });
    });
    // Tests for log level set to an invalid option.
    describe('Log Level Set to Invalid Option.', () => {
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'invalid');
      });
      // Before each, set the log level to invalid.
      // The invalid debug message should be logged to console.
      it('Log Invalid Debug Level to Console.', () => {
        const t = this; // Variable to persist this.
        log.debug(t.logLvlMessages.info); // Send a test info level message.
        log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
        log.debug(t.logLvlMessages.error);  // Send a test error level message.
        expect(t.console.log.callCount).to.equal(3);
        // Make sure that the message each time matches the debug level invalid message.
        t.console.log.args.forEach((args) => {
          expect(args[0].substring(args[0].indexOf('\t') + 1)).to.equal('The debug level invalid is incorrect. Please choose true, error, debug or info.');
        });
      });
    });
  });
