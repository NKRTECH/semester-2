// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

// const UserData = mongoose.model('UserData', userSchema);
// const testcol = mongoose.model('first', userSchema);

// module.exports = testcol ;

// module.exports = UserData; // Export the model for use in other parts of your application

module.exports = User;