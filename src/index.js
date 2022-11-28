// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const internalTopic = process.env.MY_NAME;

const ads = [
      {title: 'Hello, world (again)!', version: 3, internalTopic: internalTopic}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

// starting the server
app.listen(8080, () => {
    console.log('listening on port 8080');
});