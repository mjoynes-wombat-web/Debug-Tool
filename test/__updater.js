const v = require('../updater.js');
const expect = require('chai').expect;

describe('Testing manual update', () => {
  it('Should return a string', () => {
    v.update.updateManual('1.0.0', 'test');
    expect('1.0.0');
  });
});
describe('Testing Auto update', () => {
  it('Should return a string', () => {
    v.update.updateAuto('test');
    expect('1.0.4');
  });
});
