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
      empty: {
        logMsg: 'Sent a ERROR log message to the console.',

        url: 'http://www.url.com',
        ip: 'IP ADDRESS',
      },
    };
    this.console = {
      log: sinon.spy(),
      warn: sinon.spy(),
      error: sinon.spy(),
    };
    log.__set__('console', this.console);
  });
  describe('Nothing should output if env DEBUG not set..', () => {
    // The invalid debug message should be logged to console.
    it('No messages output.', () => {
      const t = this; // Variable to persist this.
      log.debug(t.logLvlMessages.info); // Send a test info level message.
      log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
      log.debug(t.logLvlMessages.error);  // Send a test error level message.
      log.debug(t.logLvlMessages.empty);  // Send a test error level message.
      // Ensure that no messages output.
      expect(t.console.log.callCount).to.equal(0);
      expect(t.console.warn.callCount).to.equal(0);
      expect(t.console.error.callCount).to.equal(0);
      // Make sure that the message each time matches the debug level invalid message.
      t.console.error.args.forEach((args) => {
        expect(args[0].substring(args[0].indexOf('\t') + 1)).to.equal('The message level undefined is not valid.');
      });
    });
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
      log.debug(t.logLvlMessages.info); // Send a test info level message.
      log.debug(t.logLvlMessages.debug);  // Send a test debug level message.
      log.debug(t.logLvlMessages.error);  // Send a test error level message.
      // Ensure that all three messages output to the three different consoles.
      expect(t.console.log.callCount).to.equal(1);
      expect(t.console.warn.callCount).to.equal(1);
      expect(t.console.error.callCount).to.equal(1);
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
      // Ensure that all three messages output to the three different consoles.
      expect(t.console.log.callCount).to.equal(1);
      expect(t.console.warn.callCount).to.equal(1);
      expect(t.console.error.callCount).to.equal(1);
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
      // Ensure that only info and error messages output to the their consoles.
      expect(t.console.log.callCount).to.equal(1);
      expect(t.console.error.callCount).to.equal(1);
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
      // Ensure that only error messages output ot the error console..
      expect(t.console.error.callCount).to.equal(1);
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
      expect(t.console.error.callCount).to.equal(3);
      // Make sure that the message each time matches the debug level invalid message.
      t.console.error.args.forEach((args) => {
        expect(args[0].substring(args[0].indexOf('\t') + 1)).to.equal('The debug level invalid is incorrect. Please choose true, error, debug or info.');
      });
    });
  });
  describe('Incorrect message levels output an error.', () => {
    beforeEach(() => {
      log.__set__('process.env.DEBUG', 'true');
    });
    // Before each, set the log level to invalid.
    // The invalid debug message should be logged to console.
    it('Log Invalid Debug Level to Console.', () => {
      const t = this; // Variable to persist this.
      log.debug(t.logLvlMessages.empty);  // Send a test error level message.
      expect(t.console.error.callCount).to.equal(1);
      // Make sure that the message each time matches the message level invalid message.
      t.console.error.args.forEach((args) => {
        expect(args[0].substring(args[0].indexOf('\t') + 1)).to.equal('The message level undefined is not valid.');
      });
    });
  });
});
