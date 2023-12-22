const AuctionController=require("../controllers/AuctionController.js")


const auctionrouter=require("express").Router()

auctionrouter.post("/addAuction",AuctionController.addAuction)

auctionrouter.get("/allAuction",AuctionController.getAllAuction)
auctionrouter.get("/getauction", AuctionController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

auctionrouter.get("/:id",AuctionController.getOneAuction)

auctionrouter.put("/:id",AuctionController.updateAuction)

auctionrouter.delete("/:id",AuctionController.deleteAuction)


module.exports=auctionrouter