// Importing necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Use bodyParser to parse JSON requests
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,    // Use new URL parser for MongoDB connection
    useUnifiedTopology: true // Use the unified topology to handle the connection
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Bhanu Homeopathy App!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
