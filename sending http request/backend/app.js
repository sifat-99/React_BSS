import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

const FIREBASE_BASE = 'https://redux-advance-bss-default-rtdb.firebaseio.com';

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.get('/places', async (req, res) => {
  const response = await fetch(`${FIREBASE_BASE}/http-places.json`);
  const placesData = await response.json();
  res.status(200).json({ places: placesData || [] });
});

app.get('/user-places', async (req, res) => {
  const response = await fetch(`${FIREBASE_BASE}/http-user-places.json`);
  const places = await response.json();
  res.status(200).json({ places: places || [] });
});

app.put('/user-places', async (req, res) => {
  const places = req.body.places;

  await fetch(`${FIREBASE_BASE}/http-user-places.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(places)
  });

  res.status(200).json({ message: 'User places updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000);
}
export default app;
