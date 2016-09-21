const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

const app = express();

// App setup
// set up the middleware - morgan is a logging incoming request - good for debugging

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'})); // every request will be parsed to json
router(app);

// Server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);
