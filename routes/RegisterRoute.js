const RegisterController=require("../controllers/RegisterController.js")


const registerrouter=require("express").Router()

registerrouter.post("/addRegister",RegisterController.addRegister)
registerrouter.post("/login",RegisterController.loginuser)
registerrouter.get("/allRegister",RegisterController.getAllRegister)

// router.get("/published",productController.getPublishedProduct)

registerrouter.get("/:id",RegisterController.getOneRegister)

registerrouter.put("/:id",RegisterController.updateRegister)

registerrouter.delete("/:id",RegisterController.deleteRegister)


module.exports=registerrouter