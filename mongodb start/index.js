// index.js

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
    res.json({ message: 'Hello, Nayan here!',
    name: 'Nayan',
    country: 'USA',
    age: 21,
    married: true,
    identification: '1234567890',
    gender: 'male',
    address: '123 Main St, Anytown USA',
    timestamp: Date.now()
  })
  }).get('/about', (req, res) => {
    res.send('This is the About page');
})

const uri = 'mongodb+srv://NAYANKUMARRAJ:nkr2580@my-first-cluster.hz1puza.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const database = client.db('test');
    const collection = database.collection('users');
    app.get('/', async (req,res)=>{
    const result = await collection.find({}).toArray();
      res.json(result);
    })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});