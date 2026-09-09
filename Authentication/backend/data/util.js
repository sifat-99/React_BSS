const fs = require('node:fs/promises');
const path = require('path');

const FILE_PATH = process.env.NODE_ENV === 'production' 
  ? '/tmp/events.json' 
  : path.join(process.cwd(), 'events.json');

async function readData() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (process.env.NODE_ENV === 'production' && err.code === 'ENOENT') {
       // if /tmp/events.json doesn't exist, read the default one
       const defaultData = await fs.readFile(path.join(process.cwd(), 'events.json'), 'utf8');
       return JSON.parse(defaultData);
    }
    throw err;
  }
}

async function writeData(data) {
  await fs.writeFile(FILE_PATH, JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;