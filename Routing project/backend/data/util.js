const FIREBASE_URL = 'https://redux-advance-bss-default-rtdb.firebaseio.com/routing-events.json';

async function readData() {
  const response = await fetch(FIREBASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data from Firebase.');
  }
  const data = await response.json();
  return data || { events: [] };
}

async function writeData(data) {
  const response = await fetch(FIREBASE_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to write data to Firebase.');
  }
}

exports.readData = readData;
exports.writeData = writeData;
