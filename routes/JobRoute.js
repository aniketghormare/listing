const JobController=require("../controllers/JobController.js")


const jobrouter=require("express").Router()

jobrouter.post("/addJob",JobController.addJob)

jobrouter.get("/allJob",JobController.getAllJob)
jobrouter.get("/getjobs", JobController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

jobrouter.get("/:id",JobController.getOneJob)

jobrouter.put("/:id",JobController.updateJob)

jobrouter.delete("/:id",JobController.deleteJob)


module.exports=jobrouter