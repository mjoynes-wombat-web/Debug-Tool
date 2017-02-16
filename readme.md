# Node and Express Debug Logger - Version 1
This debug logger is for node and express. It formats the log file and console output for easy readability. 
<br>
<br>
# Installation
Install by running `npm install debug-tool-express --save-dev`. You will then need to require it into your project.

### Dependencies
```
"chalk": "^1.1.3",
"dotenv": "^4.0.0"
```

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

# Code Styling
## AirBnb JavaScript
This projected follows the AirBnb Javascript styling conventions. Their documentation can be found at [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript "AirBnb JavaScript Style Guide").