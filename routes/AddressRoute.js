const AddressController = require("../controllers/AddressController.js");
const { auth } = require("../middleware/auth.middleware.js");

const addressrouter = require("express").Router();
addressrouter.use(auth);
addressrouter.post("/addAddress", AddressController.addAddress);
addressrouter.get("/getAddress", AddressController.getAllAddress);
addressrouter.delete("/:id", AddressController.deleteAddress);

addressrouter.get("/:id", AddressController.getOneAddress);

addressrouter.put("/:id", AddressController.updateAddress);


module.exports = addressrouter;
