const jwt = require("jsonwebtoken");

const config = process.env;
require("cookie-parser");

const verifyToken = (req, res, next) => {
  console.log(req.body);
  // const token = req.headers.authorization;
  const { token } = req.body;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    if (decoded) {
      next();
    } else {
      res.status(400).send("Cant verify token");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = { verifyToken };
