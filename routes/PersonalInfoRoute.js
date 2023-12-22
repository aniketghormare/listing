const registerController = require("../controllers/PersonalInfoController.js");
const { auth } = require("../middleware/auth.middleware.js");

const personalinforouter = require("express").Router();
personalinforouter.use(auth);
personalinforouter.post("/addinfo", registerController.addPersonalInfo);

personalinforouter.get("/getinfo", registerController.getPersonalInfo);
module.exports = personalinforouter;
