
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;
const uri = 'mongodb://localhost:27017/BusInfo';
app.get('/users', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const users = await db.collection('BusTracker').find().toArray();
    console.log(users)
    res.json(users);
    client.close();
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
});

app.use(express.static(path.join(__dirname, './'))); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'));
});
app.get('/print', (req, res) => {
    console.log(users);
    console.log("helloo")
  });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});