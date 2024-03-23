const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'secret';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Dummy user data (replace with your own user database)
const users = [
  { id: 1, username: 'nkr', password: bcrypt.hashSync('nkr',bcrypt.genSaltSync(10)) },
  { id: 2, username: 'rkn', password: bcrypt.hashSync('rkn',bcrypt.genSaltSync(10)) }
];
app.get('/',(req,res)=>{
  res.json(users)
})

// Login route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     // Set token expiration to 1 hour (you can adjust this as needed)
//     const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username);

//   if (user && bcrypt.compareSync(password, user.password)) {
//     const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  console.log('Stored hashed password:', user.password);
  console.log('Entered password:', password);

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 120000 }); // 1 hour expiration time
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


// Refresh token route
// app.post('/refresh-token', (req, res) => {
//   const refreshToken = req.body.refreshToken;
//   // Add logic to refresh the JWT token based on the refreshToken
//   // For simplicity, we'll just send a new token with the same expiration time
//   const newToken = jwt.sign(req.user, SECRET_KEY, { expiresIn: '1h' });
//   res.json({ token: newToken });
// });

// Refresh token route
app.post('/refresh-token', (req, res) => {
  const refreshToken = req.body.refreshToken;
  // Check if refresh token is provided
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, SECRET_KEY);

    // Update the expiration time to 1 hour from now
    const nowInSeconds = Math.floor(Date.now() / 1000);
    decoded.exp = nowInSeconds + 3600; // 3600 seconds = 1 hour

    // Generate a new JWT token with the updated payload
    const newToken = jwt.sign(decoded, SECRET_KEY);

    // Send the new token in the response
    res.json({ token: newToken });
  } catch (error) {
    // If refresh token is invalid or expired, return an error
    console.error('Error refreshing token:', error);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
});

// Registration route with password encryption
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if username already exists
  if (users.some(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    // Encrypt the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

    //  // Decode the token without verifying its signature
    // const decodedToken = jwt.decode(token);
    // if (!decodedToken) return res.sendStatus(403);
  
    // req.user = decodedToken;

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});