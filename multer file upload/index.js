// index.js

// Import required modules
const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize Express.js app
const app = express();
const PORT = process.env.PORT || 4000;

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
        console.log('dest')
    },
    filename: function (req, file, cb) {
        console.log('filename disk')
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize Multer upload configuration
const upload = multer({ storage: storage });

// Set up route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    // If file is successfully uploaded, send a response
    console.log('post method')
    console.log(req.file);
    res.send('File uploaded successfully');
});

// Serve the HTML form for file upload
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.sendFile('C:/Users/nayan/Desktop/files/SEMESTER-2/multer file upload/index.html')
    console.log(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
