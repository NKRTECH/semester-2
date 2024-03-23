// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');

// Create an Express application
const app = express();
// app.use(express.json());
// Use cookie-parser middleware
app.use(cookieParser());
// Set CORS headers to allow all origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace * with the specific origin you want to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
// Set a cookie with various attributes
// app.get('/set-cookie', (req, res) => {
//     res.cookie('username', 'johndoe', {
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//       path: '/admin',
//       secure: true,
//       httpOnly: true
//     });
//     console.log('Cookie has been set:', req.cookies.username);
//     res.send('Cookie has been set');
//   });

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'johndoe', { path: '/'}); // Set the cookie with path '/'
    console.log('Cookie has been set:', req.cookies.username);
    res.send('Cookie has been set');
  });

// Read the value of the cookie
app.get('/read-cookie', (req, res) => {
    const username = req.cookies.username;
    console.log('Value of the username cookie:', username);
    res.send(`The value of the username cookie is: ${username}`);
  });

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});