const UserController = require("../controllers/UserController.js");

const userrouter = require("express").Router();

userrouter.post("/addUser", UserController.addUser);

userrouter.get("/allUser", UserController.getAllUser);
//userrouter.get("/getUser", UserController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

userrouter.get("/:id", UserController.getOneUser);

userrouter.put("/:id", UserController.updateUser);

userrouter.delete("/:id", UserController.deleteUser);

module.exports = userrouter;
