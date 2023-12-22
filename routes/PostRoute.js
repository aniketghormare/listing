const PostController = require("../controllers/PostController.js");

const postrouter = require("express").Router();

postrouter.post("/addPost", PostController.addPost);

postrouter.get("/allPost", PostController.getAllPost);
//userrouter.get("/getUser", UserController.paginationdata)
// router.get("/published",productController.getPublishedProduct)

postrouter.get("/:id", PostController.getOnePost);

postrouter.put("/:id", PostController.updatePost);

postrouter.delete("/:id", PostController.deletePost);

module.exports = postrouter;
