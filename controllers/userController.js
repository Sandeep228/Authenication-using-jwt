const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user == null) {
      return res.status(400).json({ error: "Cannot find user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    } else {
      const token = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_SECRET_TOKEN
      );

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 60000),
        // httpOnly: true,
      });

      return res
        .status(200)
        .json({ user: user, token: token, message: "Login Succesful" });
    }
  } catch {
    res.status(500).send();
  }
};

const Register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !password) {
    return res.status(404).send("Please send data properly");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(404).send("Already resgistered");
  } else {
    const user = await User.create({ name, email, password: hashedPassword });
    return res.status(200).json(user);
  }
};

const Home = (req, res) => {
  return res.status(200).json({ isLoggedIn: true });
};

const RefreshToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET_TOKEN);
  res.cookie("jwttoken", token, {
    expires: new Date(Date.now() + 6000000),
    httpOnly: true,
  });
  return res.send("refresh token generate");
};

const ForgotPassword = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.formData;

  const user = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  //update the user with new password
  return res.status(200).json(updatedUser);
};

const validateEmail = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(200).send({ isValid: true });
  }
  return res.status(400).send({ error: "You are not registered" });
};

const logout = async (req, res) => {
  res.clearCookie("jwttoken");
  return res.status(200).json({ msg: "Logged out successfully" });
};

module.exports = {
  Login,
  Register,
  Home,
  RefreshToken,
  ForgotPassword,
  logout,
  validateEmail,
};
