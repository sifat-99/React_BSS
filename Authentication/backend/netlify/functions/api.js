const express = require('express');
const serverless = require('serverless-http');
const originalApp = require('../../app.js');

const app = express();
app.use('/.netlify/functions/api', originalApp);

module.exports.handler = serverless(app);
