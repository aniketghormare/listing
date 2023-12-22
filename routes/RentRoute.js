const RentController=require("../controllers/RentController.js")


const rentrouter=require("express").Router()

rentrouter.post("/addRent",RentController.addRent)

rentrouter.get("/allRent",RentController.getAllRent)
rentrouter.get("/getrent", RentController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

rentrouter.get("/:id",RentController.getOneRent)

rentrouter.put("/:id",RentController.updateRent)

rentrouter.delete("/:id",RentController.deleteRent)


module.exports=rentrouter