const OrderItemController = require("../controllers/OrderItemController.js");
//var upload = require("../middleware/upload.js")
var {
  userValidationRules,
  validate,
} = require("../middleware/validatior/buyvalidate");
const { auth } = require("../middleware/auth.middleware.js");
const orderitemrouter = require("express").Router();
orderitemrouter.use(auth);
orderitemrouter.post("/addOrderItem", OrderItemController.addOrderItem);

orderitemrouter.get("/allOrderItem", OrderItemController.getAllOrderItem);
//orderrouter.get("/getadmin", OrderController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

orderitemrouter.get("/:id", OrderItemController.getOneOrderItem);

orderitemrouter.put("/:id", OrderItemController.updateOrderItem);

orderitemrouter.delete("/:id", OrderItemController.deleteOrderItem);

module.exports = orderitemrouter;
