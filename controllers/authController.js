const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  const { name, username, password } = req.body;
  if (!name && !username && !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      name,
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const jwt = require("jsonwebtoken");

exports.loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
