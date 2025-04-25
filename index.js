// Importing necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// MongoDB connection string (Replace with your own MongoDB connection string)
mongoose.connect('your_mongo_connection_string_here', { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Define the schema for the patient data
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  followUpDate: { type: Date, required: true }
});

// Create a model based on the patient schema
const Patient = mongoose.model('Patient', patientSchema);

// Route to submit patient details for follow-up
app.post('/submit-followup', async (req, res) => {
  try {
    const { name, contactNumber, followUpDate } = req.body;

    // Validate if all required fields are provided
    if (!name || !contactNumber || !followUpDate) {
      return res.status(400).json({ error: 'Name, contact number, and follow-up date are required' });
    }

    // Create a new patient document
    const patient = new Patient({
      name,
      contactNumber,
      followUpDate
    });

    // Save the patient document to MongoDB
    await patient.save();

    // Return a success message
    res.status(200).json({ message: 'Patient follow-up details saved successfully!' });
  } catch (err) {
    console.error('Error saving follow-up details:', err);
    res.status(500).json({ error: 'Failed to save follow-up details' });
  }
});

// Route to get patients who need follow-up
app.get('/get-followup-patients', async (req, res) => {
  try {
    const today = new Date();

    // Fetch patients whose follow-up date is today or in the future
    const upcomingPatients = await Patient.find({
      followUpDate: { $gte: today }
    });

    // Return the list of patients
    res.status(200).json(upcomingPatients);
  } catch (err) {
    console.error('Error fetching follow-up patients:', err);
    res.status(500).json({ error: 'Failed to retrieve follow-up patients' });
  }
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

