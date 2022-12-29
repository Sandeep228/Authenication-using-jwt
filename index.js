const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

const bodyParser = require("body-parser");
const router = require("./router/routes");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
require("./db-connection");

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
app.use("/api/users", router);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
    },
  })
);

app.listen(8000, () => {
  console.log("app started");
});
