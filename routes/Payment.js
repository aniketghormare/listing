const PaymentController = require("../controllers/PaymentController.js");
//var upload = require("../middleware/upload.js")
const { auth } = require("../middleware/auth.middleware.js");
var {
  userValidationRules,
  validate,
} = require("../middleware/validatior/buyvalidate");

const paymentrouter = require("express").Router();
paymentrouter.use(auth)
paymentrouter.post("/create", PaymentController.orderCreate);

paymentrouter.get("/allPayment", PaymentController.getAllPayment);
paymentrouter.get("/getadminpayment", PaymentController.paginationdata);
// router.get("/published",productController.getPublishedProduct)

//paymentrouter.post("/order", PaymentController.orderCreate);
paymentrouter.post("/card-detail", PaymentController.cardDetail);

paymentrouter.get("/:id", PaymentController.getOnePayment);

paymentrouter.put("/:id", PaymentController.updatePayment);

paymentrouter.delete("/:id", PaymentController.deletePayment);

module.exports = paymentrouter;
