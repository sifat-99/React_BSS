const fs = require('fs');
const path = require('path');

const FIREBASE_URL = 'https://redux-advance-bss-default-rtdb.firebaseio.com';

const filesToUpload = [
  { path: 'Authentication/backend/events.json', endpoint: '/auth-events.json' },
  { path: 'Routing project/backend/events.json', endpoint: '/routing-events.json' },
  { path: 'React query/backend/data/events.json', endpoint: '/query-events.json' },
  { path: 'React query/backend/data/images.json', endpoint: '/query-images.json' },
  { path: 'food orderring app/backend/data/available-meals.json', endpoint: '/food-meals.json' },
  { path: 'sending http request/backend/data/places.json', endpoint: '/http-places.json' },
  { path: 'sending http request/backend/data/user-places.json', endpoint: '/http-user-places.json' },
];

async function seed() {
  for (const file of filesToUpload) {
    const fullPath = path.join(process.cwd(), file.path);
    if (fs.existsSync(fullPath)) {
      console.log(`Uploading ${file.path} to ${file.endpoint}...`);
      const data = fs.readFileSync(fullPath, 'utf8');
      
      const response = await fetch(`${FIREBASE_URL}${file.endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data
      });
      
      if (response.ok) {
        console.log(`Success: ${file.path}`);
      } else {
        console.error(`Failed to upload ${file.path}: ${response.statusText}`);
      }
    } else {
      console.log(`Skipped (not found): ${file.path}`);
    }
  }
}

seed();
