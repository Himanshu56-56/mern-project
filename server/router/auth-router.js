const express = require("express");
const router = express.Router();
const authcontrollers = require("../controller/auth-controller");
const validate = require("../middleware/validate-middleware");
const {signupSchema,loginSchema} = require("../validators/auth-validators");
//const loginSchema = require("../validators/login-validators");
const authMiddleware = require("../middleware/auth-middleware");

router.get("/", authcontrollers.home);

router.post(
  "/register",
  validate(signupSchema),
  authcontrollers.register
);

router.post("/login", authcontrollers.login);


router.get("/user", authMiddleware, authcontrollers.user);

module.exports = router;
