const express = require("express");
const cors = require("cors");
const passport = require("passport");
const fs = require("fs");
require("dotenv").config();

var app = express();

require("./config/passport")(passport);
require("./config/database");
app.use(cors());
app.use(passport.initialize());

app.use(express.json());

app.use("/data", require("./routes/data_existence.routes"));
app.use("/update", require("./routes/update.routes"));
/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(5000, () => console.log("server listening on port 5000"));
