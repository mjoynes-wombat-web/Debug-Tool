# Node and Express Debug Logger - Version 1
[ ![Codeship Status for DPCobb/Debug-Tool](https://app.codeship.com/projects/13161fd0-d9d6-0134-21e1-72ea577329ac/status?branch=master)](https://app.codeship.com/projects/203515)
This debug logger is for node and express. It formats the log file and console output for easy readability.
<br>
<br>
# Installation

Install by running `npm install debug-tool-express --save-dev`. You will then need to require it into your project.

You will also need to add a `logs` folder to your root directory.

### Dependencies
```
"chalk": "^1.1.3",
"dotenv": "^4.0.0"
```
<br>
<br>
#Using The Debugger

## Adding Debug Messages.
To add a debug message to your code pass the `.debug` method an object. The following values can be defined but all are optional. This will added them to the `error.log` file in this modules `logs` folder.

```
{
  logMsg = ''
  method = ''
  url = ''
  ip = ''
  level = ''
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

##Unit Testing
To unit test the debugger run `mocha` in the packages main directory.
<br>
<br>
# Code Styling
## AirBnb JavaScript
This projected follows the AirBnb Javascript styling conventions. Their documentation can be found at [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript "AirBnb JavaScript Style Guide").
<br>
<br>
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
