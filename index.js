const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ Mongo Error:', err));

// Define Mongoose schema
const caseSchema = new mongoose.Schema({
    name: String,
    age: Number,
    disease: String,
    phone: String,
    submittedAt: {
        type: Date,
        default: Date.now,
    }
});

const Case = mongoose.model('Case', caseSchema);

// Routes
app.get('/', (req, res) => {
    res.send('🚀 Bhanu Case Reminder App is Live!');
});

// Submit case endpoint
app.post('/submit-case', async (req, res) => {
    try {
        const caseData = new Case(req.body);
        await caseData.save();
        console.log('📩 New case saved:', caseData);
        res.status(200).json({ message: 'Case submitted successfully!' });
    } catch (err) {
        console.error('❌ Error saving case:', err);
        res.status(500).json({ error: 'Failed to submit case' });
    }
});

// Get all cases (optional, for testing)
app.get('/cases', async (req, res) => {
    try {
        const cases = await Case.find().sort({ submittedAt: -1 });
        res.json(cases);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch cases' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
