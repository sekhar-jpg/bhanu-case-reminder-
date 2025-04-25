// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;  // Access the MongoDB URI from .env file

mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB!');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello, welcome to Bhanu Homeopathy Reminder App!');
});

// Sample POST route for patient details submission (replace with your actual logic)
app.post('/submit-case', (req, res) => {
  const patientData = req.body;

  // Process patient data here and save to MongoDB
  console.log('Received patient data:', patientData);

  res.status(200).json({ message: 'Patient details submitted successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
