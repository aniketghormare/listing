const BuyController=require("../controllers/BuyController.js")
//var upload = require("../middleware/upload.js")
var { userValidationRules, validate} = require("../middleware/validatior/buyvalidate");

const buyrouter=require("express").Router()

buyrouter.post("/addBuy",userValidationRules("createbrand"),BuyController.addBuy)

buyrouter.get("/allBuy",BuyController.getAllBuy)
buyrouter.get("/getadmin", BuyController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

buyrouter.get("/:id",BuyController.getOneBuy)

buyrouter.put("/:id",BuyController.updateBuy)

buyrouter.delete("/:id",BuyController.deleteBuy)


module.exports=buyrouter