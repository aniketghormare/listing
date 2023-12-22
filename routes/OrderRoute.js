const OrderController = require("../controllers/OrderController.js");
//var upload = require("../middleware/upload.js")
var {
  userValidationRules,
  validate,
} = require("../middleware/validatior/buyvalidate");
const { auth } = require("../middleware/auth.middleware.js");
const orderrouter = require("express").Router();
orderrouter.use(auth);
orderrouter.post("/addOrder", OrderController.addOrder);

orderrouter.get("/allOrder", OrderController.getAllOrder);
//orderrouter.get("/getadmin", OrderController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

orderrouter.get("/:id", OrderController.getOneOrder);

orderrouter.put("/:id", OrderController.updateOrder);

orderrouter.delete("/:id", OrderController.deleteOrder);

module.exports = orderrouter;
