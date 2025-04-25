
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ Mongo Error:', err));

// Test route
app.get('/', (req, res) => {
    res.send('🚀 Bhanu Reminder App is running!');
});

// Example POST route
app.post('/submit-case', (req, res) => {
    const caseData = req.body;
    console.log('📩 Received case:', caseData);
    // Store to DB or handle logic
    res.send('Case submitted successfully');
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
