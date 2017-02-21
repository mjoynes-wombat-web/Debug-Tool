/**
 * Daniel Cobb
 * 2-20-17
 * Version Updater
 */
// require file system
const fs = require('fs');

// class for update methods
class versionUpdate {
  // updatePackage updates the package.json file with the new version number
  // param ver is the updated version from updateAuto
  updatePackage(ver) {
    // read in the current package.json
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    // set the version var
    this.version = ver;
    // adjust the version on the old package.json
    this.oldPackage.version = this.version;
    // create a new package
    this.newPackage = this.oldPackage;
    // stringify the new package
    this.package = JSON.stringify(this.newPackage, null, 2);
    // set the status
    this.status = 'package.json updated.';
    // write to package.json
    fs.writeFile('package.json', this.package, (err) => {
      if (err) {
        // if there is an error change the status to that error
        this.status = err;
      }
    });
    // return the status
    return this.status;
  }
  // updateManual returns the new version number
  // params: ver: current version, rel: release type
  updateManual(ver, rel) {
    // split the current version into an array
    this.current = ver.split('.');
    // set n to nothing
    this.n = '';
    // switch based on release type
    switch (rel) {
      // if patch
      case 'patch':
        // set n to patch + 1
        this.n = parseInt(this.current[2], 10) + 1;
        // set the new version number
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.n}`;
        break;
      // if minor
      case 'minor':
        // set n to minor + 1
        this.n = parseInt(this.current[1], 10) + 1;
        // set the new version number
        this.updateVersion = `${this.current[0]}.${this.n}.0`;
        break;
      // if major
      case 'major':
        // set n to major + 1 minor/patch = 0
        this.n = parseInt(this.current[0], 10) + 1;
        // set the new version
        this.updateVersion = `${this.n}.0.0`;
        break;
      // if none of the above
      default:
        // return invalid
        return 'Invalid release type.';
    }
    // return the updated version number
    return this.updateVersion;
  }
  // updateAuto automatically finds and updates the version number and rewrites package.json
  // params: rel: release type
  updateAuto(rel) {
    // read the old package
    this.oldPackage = JSON.parse(fs.readFileSync('package.json'));
    // split the old version into an array
    this.current = this.oldPackage.version.split('.');
    // set n to nothing
    this.n = '';
    switch (rel) {
      // if patch update patch and set new version number
      case 'patch':
        this.n = parseInt(this.current[2], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.current[1]}.${this.n}`;
        break;
      // if minor update minor and set new version number
      case 'minor':
        this.n = parseInt(this.current[1], 10) + 1;
        this.updateVersion = `${this.current[0]}.${this.n}.0`;
        break;
      // if major update major set minor&patch to 0 update version number
      case 'major':
        this.n = parseInt(this.current[0], 10) + 1;
        this.updateVersion = `${this.n}.0.0`;
        break;
      // if none of the above invalid release type
      default:
        return 'Invalid release type.';
    }
    // send all this on to the updatePackage method to rewrite package.json
    const update = new versionUpdate();
    const status = update.updatePackage(this.updateVersion);
    return status;
  }
}

exports.update = new versionUpdate();
