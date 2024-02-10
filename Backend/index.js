const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

var app = express();

require("./config/database");
app.use(cors());

app.use(express.json());

app.use("/data", require("./routes/data.routes"));
/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(5000, () => console.log("server listening on port 5000"));
