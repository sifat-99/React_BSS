import path from 'path';
import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

const EVENTS_FILE = process.env.NODE_ENV === 'production' ? '/tmp/events.json' : path.join(process.cwd(), 'data', 'events.json');
async function readEvents() {
  try {
    const data = await fs.readFile(EVENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (process.env.NODE_ENV === 'production' && err.code === 'ENOENT') {
      const defaultData = await fs.readFile(path.join(process.cwd(), 'data', 'events.json'), 'utf8');
      return JSON.parse(defaultData);
    }
    throw err;
  }
}
async function writeEvents(events) {
  await fs.writeFile(EVENTS_FILE, JSON.stringify(events));
}

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.get('/events', async (req, res) => {
  const { max, search } = req.query;
  let events = await readEvents();

  if (search) {
    events = events.filter((event) => {
      const searchableText = `${event.title} ${event.description} ${event.location}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (max) {
    events = events.slice(events.length - max, events.length);
  }

  res.json({
    events: events.map((event) => ({
      id: event.id,
      title: event.title,
      image: event.image,
      date: event.date,
      location: event.location,
    })),
  });
});

app.get('/events/images', async (req, res) => {
  const imagesFileContent = await fs.readFile(path.join(process.cwd(), 'data', 'images.json'));
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
});

app.get('/events/:id', async (req, res) => {
  const { id } = req.params;

  const events = await readEvents();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no event could be found.` });
  }

  setTimeout(() => {
    res.json({ event });
  }, 1000);
});

app.post('/events', async (req, res) => {
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ message: 'Event is required' });
  }

  console.log(event);

  if (
    !event.title?.trim() ||
    !event.description?.trim() ||
    !event.date?.trim() ||
    !event.time?.trim() ||
    !event.image?.trim() ||
    !event.location?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const events = await readEvents();

  const newEvent = {
    id: Math.round(Math.random() * 10000).toString(),
    ...event,
  };

  events.push(newEvent);

  await writeEvents(events);

  res.json({ event: newEvent });
});

app.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ message: 'Event is required' });
  }

  if (
    !event.title?.trim() ||
    !event.description?.trim() ||
    !event.date?.trim() ||
    !event.time?.trim() ||
    !event.image?.trim() ||
    !event.location?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const events = await readEvents();

  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events[eventIndex] = {
    id,
    ...event,
  };

  await writeEvents(events);

  setTimeout(() => {
    res.json({ event: events[eventIndex] });
  }, 1000);
});

app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  const events = await readEvents();

  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events.splice(eventIndex, 1);

  await writeEvents(events);

  setTimeout(() => {
    res.json({ message: 'Event deleted' });
  }, 1000);
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}
export default app;
