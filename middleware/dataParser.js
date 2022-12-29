const multer = require("multer");
const storage = multer.diskStorage({});
const dataParser = multer({ storage: storage }).single("pic");
module.exports = { dataParser };
