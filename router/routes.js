const express = require("express");
const {
  Login,
  Register,
  Home,
  RefreshToken,
  ForgotPassword,
  logout,
  validateEmail,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");
const { dataParser } = require("../middleware/dataParser");

const router = express.Router();

router.use(dataParser);
router.post("/", Register);
router.post("/login", Login);
router.get("/logout", logout);
router.post("/validemail", validateEmail);
router.post("/welcome", verifyToken, Home);
router.post("/refreshtoken", RefreshToken);
router.post("/forgot", ForgotPassword);

module.exports = router;
