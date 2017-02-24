# Node and Express Utility Tool - Version 1.1.3

##[ ![Codeship Status for DPCobb/Debug-Tool](https://app.codeship.com/projects/13161fd0-d9d6-0134-21e1-72ea577329ac/status?branch=master)](https://app.codeship.com/projects/203515)
This utility is for node and express. It formats the console output for easy readability and provides a node package.json version incrementor.

<br>
<br>
# Installation

Install by running `npm install debug-tool-express --save-dev`. You will then need to require it into your project.

### Dependencies
```
"chalk": "^1.1.3",
"dotenv": "^4.0.0"
```
<br>
<br>
#Using The Debugger

## Adding Debug Messages.
To add a debug message to your code pass the `.debug` method an object. The following values can be defined but all are optional. There are three message levels. They are `ERROR`, `INFO` and `DEBUG`.

```
{
  logMsg = ''
  method = ''
  url = ''
  ip = ''
  level = 'Selected one of the levels above.'
}
  ```
## Activating Console Messages.
The debugging logger messages for this application have 3 levels. They are error, info, and debug.

Set the `DEBUG=opt` to one of the `opt` below. This will output specific level messages to the console.

Debug Option | Debug Message Outputs
---------------------|------------------------------------
true | Outputs all debug messages.
debug | Outputs all debug messages.
info | Outputs the info, and error debug messages.
error | Outputs the error debug messages.
<br>
<br>
# Version Updater

The version updater has two different methods: updateManual and updateAuto. The class is exported as update.

## updateManual(ver, rel)
This method takes two parameters: the current version and the type of release. The available release types are major, minor, and patch. The updateManual method will just return the value for the new current version based on your inputs. The following examples assume you have required the file with the variable v:
```
For Manual updates:
v.update.updateManual('1.0.1', major) returns: 2.0.0
v.update.updateManual('1.0.1', minor) returns: 1.1.1
v.update.updateManual('1.0.1', patch) returns: 1.0.2
```
## updateAuto(rel)
This method accepts on parameter for the release type: major, minor, or patch. This method will pull the current release number from the package.json file and make the appropriate changes to the version based on the release parameter given. The following examples assume you have required the file with the variable v:
```
For Auto updates:
v.update.updateAuto('major') automatically updates the major release in package.json and resets minor and patch to zero
v.update.updateAuto('minor') automatically updates the minor release in package.json
v.update.updateAuto('patch') automatically updates the patch release in package.json
```
updateAuto will also return a status of 'package.json updated'.
# Workflow
## Using Feature Branches
When adding features to the URL Shorter the feature branch workflow should be used. This means the following steps should be taken.
* `git checkout master` - Switch to the master branch.
* `git pull` - Pull any updates.
* `git branch <feature-name>` - Create a new feature.branch replacing `<feature-name>` with the feature name.
* `git checkout <feature-name>` - Switch to that branches name.
* Work on your code and push to the feature branch.
* `git checkout master` - When done switch to the master branch.
* `git pull` - Pull any updates from the master
* `git checkout <feature-name` - Switch back to the feature branch.
* `git merge master` - Merge any changes from the master.
* Commit and push any changes if necessary.
* Create a pull request for your feature into the master branch. Codeship must get a green build before this is allowed.
<br>
<br>
##Unit Testing
To unit test the debugger run `mocha` in the packages main directory.
<br>
<br>
# Code Styling
## AirBnb JavaScript
This projected follows the AirBnb Javascript styling conventions. Their documentation can be found at [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript "AirBnb JavaScript Style Guide").
