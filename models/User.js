const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  "username": {
    type: String,
    required: true, // Ensure email is required
    unique: true,   // Ensure email is unique
  },
  "name":{
     type: String,
    required: true
  },
  "password":{
    type: String, 
    required: true 
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
