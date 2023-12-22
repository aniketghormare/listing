const BuyCartController = require("../controllers/BuyCartController.js");
const { auth } = require("../middleware/auth.middleware.js");

const buycartrouter = require("express").Router();
buycartrouter.use(auth);
buycartrouter.post("/addCartBuy", BuyCartController.addBuyCart);
buycartrouter.get("/getCartBuy", BuyCartController.getAllBuyCart);
buycartrouter.delete("/deleteAllBuyCart", BuyCartController.deleteAllBuyCart);
buycartrouter.delete("/:id", BuyCartController.deleteBuyCart);

module.exports = buycartrouter;
