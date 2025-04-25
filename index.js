// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('your_mongo_connection_string_here', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a patient schema
const patientSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  followUpDate: Date
});

const Patient = mongoose.model('Patient', patientSchema);

// Route to submit patient details and follow-up information
app.post('/submit-followup', async (req, res) => {
  try {
    const { name, contactNumber, followUpDate } = req.body;
    
    // Create a new patient document
    const patient = new Patient({
      name,
      contactNumber,
      followUpDate
    });
    
    // Save the patient data to MongoDB
    await patient.save();
    
    res.status(200).send('Patient follow-up details saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to save follow-up details');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
