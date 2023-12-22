const RentCartController = require("../controllers/RentCartController.js");
const { auth } = require("../middleware/auth.middleware.js");

const rentcartrouter = require("express").Router();
rentcartrouter.use(auth);
rentcartrouter.post("/addCartRent", RentCartController.addRentCart);
rentcartrouter.get("/getCartRent", RentCartController.getAllRentCart);
rentcartrouter.delete(
  "/deleteAllRentCart",
  RentCartController.deleteAllRentCart
);
rentcartrouter.delete("/:id", RentCartController.deleteRentCart);
module.exports = rentcartrouter;
