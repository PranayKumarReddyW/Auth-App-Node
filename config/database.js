const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1); // Optional: exit the process if the connection fails
  }
};
