// Pull in the requirements.
const log = require('../log.js');

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
describe('Test console.log', () => {
  const logLvlMessages = {
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
  const msgs = logLvlMessages;
  it('Should send a message to console.log', () => {
    const debug = new debugMsg(msgs.debug);
    log.debug(debug);
  });
  it('Should send a message to console.warn', () => {
    const debug = new debugMsg(msgs.info);
    log.debug(debug);
  });
  it('Should send a message to console.error', () => {
    const debug = new debugMsg(msgs.error);
    log.debug(debug);
  });
});
