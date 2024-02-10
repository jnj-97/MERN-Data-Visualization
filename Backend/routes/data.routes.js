const DataController = require("../controllers/data.controller");
const express = require("express");
const router = express.Router();
router.get("/intensity", DataController.prototype.Intensity);
module.exports = router;
