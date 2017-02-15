# URL Shortener - Version 1.5
This URL shortener creates a unique shortened URL based on a randomly generated string from Math.random();
<br>
<br>
# Installation
## Node Setup
Use `npm install` in the main directory to install the project and its dependencies.

### Dependencies
```
"body-parser": "^1.15.2",
"dotenv": "^4.0.0",
"express": "^4.14.0",
"mysql": "^2.11.1",
"sequelize": "^3.24.3"
```

## Database Access Environment Variables
This application uses Sequelize for database access and dotenv for the database environment variables. The template.env file is a template for your environment variables. Enter your database access information into that file and save it as .env.

### .ENV File Example
```
DB_NAME=*Your Database Name*
DB_USER=*Your User Name*
DB_PASS=*Your Password*
DB_HOST=*Your Database Host Address*
DB_SCHEMA=*Your Database Schema Type i.e. mysql*
DB_PORT=*Your Database Port*
```
<br>
<br>

# Usage
## Starting Application
To start the application normally run `node server.js`.

## Debugging
The debugging logger messages for this application have 3 levels. They are error, info, and debug. Messages are output to `./log/error.log`.

To start the application with console debugging run `DEBUG=opt server.js` where you replace `opt` with one of the options below. This will output specific messages to the console.

Debug Option | Debug Message Outputs
---------------------|------------------------------------
true | Outputs all debug messages.
debug | Outputs all debug messages.
info | Outputs the info, and error debug messages.
error | Outputs the error debug messages.
<br>
<br>

##Unit Testing
To unit test the various portions of the applications your can run the following functions while in the root directory. Due to rewire overlap all tests cannot be run at once.

Command | Modules Tested
----------------|-------------------------
`mocha test/_log.js` | Tests the debug logging functionality.
`mocha test/_models.js` | Tests the models functionality.
`mocha test/_routes.js` | Tests the routes functionality.

# GO Route
## Accessing a shortened URL.
#### [`http://localhost:3000/go/:shortenedURL`]

### Summary
By replacing `:shortenedURL` with one of the shortened URLs you will be redirected to the full URL that's stored in the database.
<br>
<br>
<br>
# API Access

## Creating a short URL.
#### [`POST http://localhost:3000/api/v1/urls`]

### Summary
By passing a URL to this address you will create a shortened URL. If the URL already exists it will return that URLs information.

### Parameters
  Name  |  Located In  |  Description
--------|--------------|-------------
   URL  |     body     |  Pass in a URL to be shortened.

### Sample Response
```
{
  "status": {
    "code": 201
  },
  "urls": [
    {
      "id": 59,
      "URL": "http://www.warframe.com",
      "shortURL": "l05hmgxdn",
      "createdAt": "2017-02-05T00:32:56.000Z",
      "updatedAt": "2017-02-05T00:32:56.000Z"
    }
  ]
}
```
<br>
<br>
## Accessing All URLs.
#### [`GET http://localhost:3000/api/v1/urls`]

### Summary
Accessing this endpoint will return all of the shortened URLs.

### Sample Response
```
{
  "status": {
    "code": 200
  },
  "urls": [
    {
      "id": 11,
      "URL": "http://www.google.com/",
      "shortURL": "ui05f",
      "createdAt": "2017-02-04T18:14:52.000Z",
      "updatedAt": "2017-02-04T18:14:52.000Z"
    },
    {
      "id": 12,
      "URL": "http://www.amazon.com",
      "shortURL": "idtrl21k1",
      "createdAt": "2017-02-04T18:14:58.000Z",
      "updatedAt": "2017-02-04T18:14:58.000Z"
    }
  ]
}
```
<br>
<br>
## Accessing URL by ID.
##### [`GET http://localhost:3000/api/v1/urls/:id`]

### Summary
By replacing `:id` in the GET URL you can retrieve a URL by its ID.

### Sample Response
```
{
  "status": {
    "code": 200
  },
  "urls": [
    {
      "id": 11,
      "URL": "http://www.google.com/",
      "shortURL": "ui05f",
      "createdAt": "2017-02-04T18:14:52.000Z",
      "updatedAt": "2017-02-04T18:14:52.000Z"
    }
  ]
}
```
<br>
<br>
## Updating URL by ID.
##### [`POST http://localhost:3000/api/v1/urls/:id`]

### Summary
By replacing `:id` in the POST URL you can pass a URL to this address and update the URL with that ID.

### Parameters
  Name  |  Located In  |  Description
--------|--------------|-------------
   URL  |     body     |  Pass in a URL to be shortened.

### Sample Response
```
{
  "status": {
    "code": 200
  },
  "urls": [
    {
      "id": 11,
      "URL": "https://docs.google.com/",
      "shortURL": "ui05f",
      "createdAt": "2017-02-04T18:14:52.000Z",
      "updatedAt": "2017-02-05T00:42:02.000Z"
    }
  ]
}
```
<br>
<br>
## Deleting URL by ID.
##### [`DELETE http://localhost:3000/api/v1/urls/:id`]

### Summary
By replacing `:id` in the DELETE URL you can delete the URL with that ID.

### Sample Response
```
{
  "status": {
    "code": 200
  },
  "urls": [
    {
      "id": "59",
      "deleted": true
    }
  ]
}
```
<br>
<br>

# Code Styling
## AirBnb JavaScript
This projected follows the AirBnb Javascript styling conventions. Their documentation can be found at [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript "AirBnb JavaScript Style Guide").