const fs = require('fs');

class versionUpdate {
  updatePackage(ver) {
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    this.version = ver;
    this.oldPackage.version = this.version;
    this.newPackage = this.oldPackage;
    this.package = JSON.stringify(this.newPackage, null, 2);
    this.status = 'package.json updated.';
    fs.writeFile('package2.json', this.package, (err) => {
      if (err) {
        this.status = err;
      }
    });
    return this.status;
  }
  updateManual(ver, rel) {
    this.current = ver.split('.');
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    this.n = '';
    switch (rel) {
      case 'patch':
        this.n = parseInt(this.current[2], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.n}`;
        break;
      case 'minor':
        this.n = parseInt(this.current[1], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.n}.${this.current[2]}`;
        break;
      case 'major':
        this.n = parseInt(this.current[0], 10) + 1;
        this.updateVersion = `${this.n}.0.0`;
        break;
      case 'test':
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.current[2]}`;
        break;
      default:
        return 'Invalid release type.';
    }
    return this.updateVersion;
  }
  updateAuto(rel) {
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    this.current = this.oldPackage.version.split('.');
    this.n = '';
    switch (rel) {
      case 'patch':
        this.n = parseInt(this.current[2], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.n}`;
        break;
      case 'minor':
        this.n = parseInt(this.current[1], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.n}.${this.current[2]}`;
        break;
      case 'major':
        this.n = parseInt(this.current[0], 10) + 1;
        this.updateVersion = `${this.n}.0.0`;
        break;
      case 'test':
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.current[2]}`;
        break;
      default:
        return 'Invalid release type.';
    }
    const update = new versionUpdate();
    const status = update.updatePackage(this.updateVersion);
    return status;
  }
}
const test = new versionUpdate();
console.log(test.updateManual('1.0.0', 'test'));
exports.versionUpdate = new versionUpdate();
