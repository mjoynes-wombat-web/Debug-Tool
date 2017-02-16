const rewire = require('rewire');
const expect = require('chai').expect;
const sinon = require('sinon');

const log = rewire('../log');

class debugMsg {
  constructor(object) {
    this.logMsg = object.logMsg; // Message to log.
    this.method = object.method; // Access method.
    this.url = object.url; // Accessed URL.
    this.ip = object.ip; // Access by IP.
    this.level = object.level; // Message level.
  }
}

function compareLogMsg(sent, expected, format) {
  const logStrings = [];

  sent.forEach((args) => {
    logStrings.push(args[1].substring(args[1].indexOf('\t') + 1));
  });

  Object.keys(expected).forEach((key, index) => {
    console.log(key);
    const expectedMsg = new debugMsg(expected[key]);

    Object.keys(expectedMsg).forEach((k) => {
      console.log(k);
      if (expectedMsg[k] === undefined) {
        expectedMsg[k] = '';
      }
    });

    const msg = format(expectedMsg);

    const resultMsg = logStrings[index];

    // console.log(resultMsg);
    // console.log(msg);

    expect(msg).to.equal(resultMsg);
  });
}

describe('Debug Logging Utility', () => {
  beforeEach(() => {
    this.console = {
      log: sinon.spy(),
    };

    this.fs = {
      stat: sinon.spy(),
      appendFile: sinon.spy(),
    };

    log.__set__('fs.stat', this.fs.stat);
    log.__set__('fs.appendFile', this.fs.appendFile);
    log.__set__('console', this.console);
    log.__set__('process.env.DEBUG', 'true');
  });

  afterEach(() => {
    this.fs.stat.reset();
    this.fs.appendFile.reset();
  });
  describe('Testing Each Log Level', () => {
    describe('Log Level Set to true.', () => {
      beforeEach(() => {
        this.logLvlMessages = {
          info: {
            logMsg: 'Sent an INFO log message to the console.',
            method: 'METHOD',
            url: 'URL',
            ip: 'IP ADDRESS',
            level: 'INFO',
          },
          debug: {
            logMsg: 'Sent a DEBUG log message to the console.',
            method: 'METHOD',
            url: 'URL',
            ip: 'IP ADDRESS',
            level: 'DEBUG',
          },
          error: {
            logMsg: 'Sent a ERROR log message to the console.',
            method: 'METHOD',
            url: 'URL',
            ip: 'IP ADDRESS',
            level: 'ERROR',
          },
        };
      });

      it('Log All Level Messages to the Console.', () => {
        const t = this;

        log.debug(t.logLvlMessages.info);

        log.debug(t.logLvlMessages.debug);

        log.debug(t.logLvlMessages.error);

        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);

        expect(t.console.log.callCount).to.equal(3);
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
    describe('Log Level Set to debug.', () => {
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'debug');
      });
      it('Log All Level Messages to the Console.', () => {
        const t = this;

        log.debug(t.logLvlMessages.info);

        log.debug(t.logLvlMessages.debug);

        log.debug(t.logLvlMessages.error);

        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);

        expect(t.console.log.callCount).to.equal(3);
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
    describe('Log Level Set to info.', () => {
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'info');
      });
      it('Log Only INFO and ERROR level messages to Console.', () => {
        const t = this;

        log.debug(t.logLvlMessages.info);

        log.debug(t.logLvlMessages.debug);

        log.debug(t.logLvlMessages.error);

        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);

        expect(t.console.log.callCount).to.equal(2);
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
    describe('Log Level Set to error.', () => {
      beforeEach(() => {
        log.__set__('process.env.DEBUG', 'error');
      });
      it('Log Only ERROR level messages to Console.', () => {
        const t = this;

        log.debug({
          logMsg: 'Sent an INFO log message to the console.',
          method: 'METHOD',
          url: 'URL',
          ip: 'IP ADDRESS',
          level: 'INFO',
        });

        log.debug({
          logMsg: 'Sent a DEBUG log message to the console.',
          method: 'METHOD',
          url: 'URL',
          ip: 'IP ADDRESS',
          level: 'DEBUG',
        });

        log.debug({
          logMsg: 'Sent a ERROR log message to the console.',
          method: 'METHOD',
          url: 'URL',
          ip: 'IP ADDRESS',
          level: 'ERROR',
        });

        compareLogMsg(t.fs.appendFile.args, this.logLvlMessages, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);

        expect(t.console.log.callCount).to.equal(1);
        expect(t.fs.stat.callCount).to.equal(3);
        expect(t.fs.appendFile.callCount).to.equal(3);
      });
    });
  });
  describe('Testing Empty Field Handling', () => {
    it('Replace undefined with spaces.', () => {
      const t = this;
      const logMsg = {
        emptyField: {
          logMsg: 'Testing undefined fields.',
          level: 'INFO',
        },
      };

      log.debug(logMsg.emptyField);

      compareLogMsg(t.fs.appendFile.args, logMsg, expected => `${expected.ip}\t${expected.method}\t${expected.url}\t\t${expected.level}\t${expected.logMsg}\n`);

      expect(t.console.log.callCount).to.equal(1);
      expect(t.fs.stat.callCount).to.equal(1);
      expect(t.fs.appendFile.callCount).to.equal(1);
    });
  });
});

