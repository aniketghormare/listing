const TenderController=require("../controllers/TenderController.js")


const tenderrouter=require("express").Router()

tenderrouter.post("/addTender",TenderController.addTender)

tenderrouter.get("/allTender",TenderController.getAllTender)
tenderrouter.get("/gettender", TenderController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

tenderrouter.get("/:id",TenderController.getOneTender)

tenderrouter.put("/:id",TenderController.updateTender)

tenderrouter.delete("/:id",TenderController.deleteTender)


module.exports=tenderrouter