const express = require("express");
const router = express.Router();

const serviceController = require("../controller/service-controller");

// ✅ function pass karo
router.route("/service").get(serviceController.services);

module.exports = router;
