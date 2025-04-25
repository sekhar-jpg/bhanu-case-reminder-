const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Catch uncaught exceptions to help debugging on Render
process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception:', err);
});

// MongoDB Connection
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ Mongo Error:', err));

// Middleware
app.use(bodyParser.json());

// Mongoose Schema
const CaseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  problem: String,
  submittedAt: { type: Date, default: Date.now }
});
const Case = mongoose.model('Case', CaseSchema);

// Test route - Ensure the app is running correctly
app.get('/', (req, res) => {
  res.send('✅ Bhanu WhatsApp Reminder App is running!');
});

// API endpoint to receive cases
app.post('/submit-case', async (req, res) => {
  const { name, phone, problem } = req.body;

  // Check if the data exists
  if (!name || !phone || !problem) {
    return res.status(400).send({ message: '❌ Missing required fields' });
  }

  try {
    const newCase = new Case({ name, phone, problem });
    await newCase.save();
    res.status(201).send({ message: '✅ Case saved successfully!' });
  } catch (err) {
    console.error('❌ Error saving case:', err);
    res.status(500).send({ message: '❌ Error saving case' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
