const rewire = require('rewire');
const expect = require('chai').expect;
const sinon = require('sinon');

const log = rewire('../utils/log');

describe('Debug Logging Utility', () => {
  describe('Testing Each Log Level', () => {
    beforeEach(() => {
      this.console = {
        log: sinon.spy(),
      };
      this.fs = {
        stat: sinon.spy(),
      };

      log.__set__('fs.stat', this.fs.stat);
      log.__set__('console', this.console);
      log.__set__('process.env.DEBUG', 'true');
    });

    afterEach(() => {
      this.fs.stat.reset();
    });

    describe('Log Level Set to true.', () => {
      it('Log All Level Messages to the Console.', () => {
        const _this = this;

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

        expect(_this.console.log.callCount).to.equal(3);
        expect(_this.fs.stat.callCount).to.equal(3);
      });
    });
    describe('Log Level Set to debug.', () => {
      beforeEach(() => {
        this.console = {
          log: sinon.spy(),
        };

        log.__set__('console', this.console);
        log.__set__('process.env.DEBUG', 'debug');
      });
      it('Log All Level Messages to the Console.', () => {
        const _this = this;

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

        expect(_this.console.log.callCount).to.equal(3);
        expect(_this.fs.stat.callCount).to.equal(3);
      });
    });
    describe('Log Level Set to info.', () => {
      beforeEach(() => {
        this.console = {
          log: sinon.spy(),
        };

        log.__set__('console', this.console);
        log.__set__('process.env.DEBUG', 'info');
      });
      it('Log Only INFO and ERROR level messages to Console.', () => {
        const _this = this;

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

        expect(_this.console.log.callCount).to.equal(2);
        expect(_this.fs.stat.callCount).to.equal(3);
      });
    });
    describe('Log Level Set to error.', () => {
      beforeEach(() => {
        this.console = {
          log: sinon.spy(),
        };

        log.__set__('console', this.console);
        log.__set__('process.env.DEBUG', 'error');
      });
      it('Log Only ERROR level messages to Console.', () => {
        const _this = this;

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

        expect(_this.console.log.callCount).to.equal(1);
        expect(_this.fs.stat.callCount).to.equal(3);
      });
    });
  });
  // describe('Testing Formatting Variations.')
});

