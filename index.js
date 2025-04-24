const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('your-mongodb-connection-url', {mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Mongo Error:', err));

// Middlewares
app.use(bodyParser.json());

// Mongoose Schema
const CaseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  problem: String,
  submittedAt: { type: Date, default: Date.now }
});
const Case = mongoose.model('Case', CaseSchema);

// Default route
app.get('/', (req, res) => {
  res.send('Bhanu WhatsApp Reminder App is running!');
});

// New route - to receive case info
app.post('/submit-case', async (req, res) => {
  const { name, phone, problem } = req.body;

  try {
    const newCase = new Case({ name, phone, problem });
    await newCase.save();
    res.status(201).send({ message: 'Case saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error saving case' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
