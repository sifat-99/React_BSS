import express from 'express';
import serverless from 'serverless-http';
import originalApp from '../../app.js';

const app = express();
app.use('/.netlify/functions/api', originalApp);

export const handler = serverless(app);
