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

// Example Route
app.get('/', (req, res) => {
    res.send('🚀 Bhanu Homeopathy App is live!');
});

// Your /submit-case route and other routes here
// Example:
app.post('/submit-case', (req, res) => {
    // handle case data here
    res.send('Case received!');
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
