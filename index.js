const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.use("/api", require("./routes/routes"));

require("./config/database").connect();
