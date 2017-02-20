const fs = require('fs');

class versionUpdate {
  update(ver, rel) {
    this.current = ver.split('.');
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    return this.current;
  }
  updatePackage(ver) {
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    this.version = ver;
  }
}
const versionUpdater = new versionUpdate();
console.log(versionUpdater.update('1.0.0', 'minor'));
