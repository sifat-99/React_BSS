import path from 'path';
import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';



const app = express();

const FIREBASE_BASE = 'https://redux-advance-bss-default-rtdb.firebaseio.com';

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile(path.join(process.cwd(), 'data', 'available-meals.json'), 'utf8');
  res.json(JSON.parse(meals));
});

const ORDERS_FILE = process.env.NODE_ENV === 'production' ? '/tmp/orders.json' : path.join(process.cwd(), 'data', 'orders.json');

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  let allOrders = [];
  try {
    const orders = await fs.readFile(ORDERS_FILE, 'utf8');
    allOrders = JSON.parse(orders);
  } catch (error) {
    // File doesn't exist yet, we'll start with an empty array
  }

  allOrders.push(newOrder);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

export default app;
