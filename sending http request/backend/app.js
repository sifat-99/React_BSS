import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

const USER_PLACES_FILE = process.env.NODE_ENV === 'production' ? '/tmp/user-places.json' : './data/user-places.json';

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
  const fileContent = await fs.readFile('./data/places.json');

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get('/user-places', async (req, res) => {
  let fileContent;
  try {
    fileContent = await fs.readFile(USER_PLACES_FILE);
  } catch (err) {
    if (process.env.NODE_ENV === 'production' && err.code === 'ENOENT') {
      fileContent = await fs.readFile('./data/user-places.json');
    } else {
      throw err;
    }
  }

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  const places = req.body.places;

  await fs.writeFile(USER_PLACES_FILE, JSON.stringify(places));

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
