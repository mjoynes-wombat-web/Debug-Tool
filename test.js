const log = require('./log');

log.debug({
    logMsg: 'Testing independent log.',
    level: 'INFO',
  });

  log.debug({
    logMsg: 'Testing independent log.',
    level: 'DEBUG',
  });

  log.debug({
    logMsg: 'Testing independent log.',
    level: 'ERROR',
  });