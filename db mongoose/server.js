// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./user');
const cors = require('cors')
// console.log(express)
// const UserData = require('./user'); // Import the UserData model
// const testcol = require('./user');

const app = express();
const PORT = 3000;
app.use(express.json()); // Add this middleware to parse JSON in the request body
// app.use(cors())

console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
// console.log(app)
// console.log(mongoose)
mongoose.connect('mongodb+srv://NAYANKUMARRAJ:nkr2580@my-first-cluster.hz1puza.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the database');

    // Add a route to handle GET requests for retrieving all users
    app.get('/', async (req, res) => {
      res.header({
    "Access-Control-Allow-Origin": "*",
      })
      try {
        const users = await User.find(); // Retrieve all users from the database
        res.json(users); // Return the list of users as JSON
      } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
      }
    });

    // app.get('/data', async (req, res) => {
    //   try {
    //     const userData = await testcol.find(); // Retrieve all documents from the "userdata" collection
    //     res.json(userData); // Return the list of userdata as JSON
    //   } catch (error) {
    //     res.status(500).json({ message: error.message }); // Handle any errors
    //   }
    // });

    //************************************************************************** */
    // Add a route to handle POST requests for adding a new user
    // app.post('/users', async (req, res) => {
    //   try {
    //     const newUser = new User({
    //       name: req.body.name,
    //       email: req.body.email
    //     });
    //     const savedUser = await newUser.save();
    //     res.json(savedUser); // Return the new user as JSON
    //   } catch (error) {
    //     res.status(400).json({ message: error.message }); // Handle any errors
    //   }
    // });

    // POST route to create a new user
    app.post('/users', async (req, res) => {
      const userData = req.body; // Get user data from the request body
      try {
        const createdUser = await User.create(userData); // Create a new user
        res.status(201).json(createdUser); // Respond with the created user
      } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message }); // Respond with an error message
      }
    });

    //***************************************************************** */
    // app.put('/users/:id', async (req, res) => {
    //   const userId = req.params.id;

    //   try {
    //     // Find the user by ID
    //     const user = await User.findById(userId);

    //     if (!user) {
    //       return res.status(404).json({ message: 'User not found' });
    //     }

    //     // Update user information
    //     user.name = req.body.name || user.name;
    //     user.email = req.body.email || user.email;

    //     // Save the updated user
    //     const updatedUser = await user.save();

    //     res.json(updatedUser);
    //   } catch (error) {
    //     res.status(400).json({ message: error.message }); // Handle any errors
    //   }
    // });

    // PUT route to update a user by ID
    app.put('/users/:id', async (req, res) => {
      const userId = req.params.id; // Get the user ID from the request params
      const newData = req.body; // Get the updated data from the request body
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true }); // Find a user by ID and update with the new data
        if (updatedUser) {
          res.status(200).json(updatedUser); // Respond with the updated user
        } else {
          res.status(404).json({ message: 'User not found' }); // Respond with a message if user is not found
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message }); // Respond with an error message
      }
    });

    //********************************************************/

    // DELETE route to delete a user by ID
    app.delete('/users/:id', async (req, res) => {
      const userId = req.params.id; // Get the user ID from the request params
      try {
        const deletedUser = await User.findByIdAndDelete(userId); // Find a user by ID and delete
        if (deletedUser) {
          res.status(200).json(deletedUser); // Respond with the deleted user
        } else {
          res.status(404).json({ message: 'User not found' }); // Respond with a message if user is not found
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message }); // Respond with an error message
      }
    });
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
});