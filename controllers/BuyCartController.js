const db = require("../models");

const buycart = db.buycart;

const addBuyCart = async (req, res) => {
  // console.log(req);
  try {
    // if (req.file == undefined) {
    //   return res.send(`You must select a file.`);
    // }
    const { buyid, id, image, title, seller, brand, moq, price, rating } =
      req.body;

    const existingCartItem = await buycart.findOne({
      where: { buyid: buyid, uid: req.body.uid },
    });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product is already in the cart" });
    }

    // let info = {
    //   buyid: req.body.id,
    //   image: req.body.image,
    //   title: req.body.title,
    //   seller: req.body.seller,
    //   brand: req.body.brand,
    //   moq: req.body.moq,
    //   price: req.body.price,
    //   rating: req.body.rating,
    // };

    const cartbuy = await buycart.create(req.body);
    res.status(200).send(cartbuy);
    console.log(cartbuy);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

// const getAllBuyCart = async (req, res) => {
//   let cartbuy = await buycart.findAll({ where: { uid: req.body.uid } });
//   //console.log(req)
//   res.status(200).send(cartbuy);
// };

const getAllBuyCart = async (req, res) => {
  try {
    const uid = req.body.uid;

    if (!uid) {
      return res.status(400).send({
        success: false,
        message: "uid is required to fetch cart items",
      });
    }

    const cartItems = await buycart.findAll({ where: { uid } });

    res.status(200).send(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const deleteAllBuyCart = async (req, res) => {
  try {
    const uid = req.body.uid;

    if (!uid) {
      return res.status(400).send({
        success: false,
        message: "uid is required to delete all items in the cart",
      });
    }

    // Delete all items in the cart for the specified user
    await buycart.destroy({ where: { uid } });

   // return res.status(200).send(uid);
    res.status(200).send("All items in the cart are deleted");
  } catch (error) {
    console.error("Error deleting all items in the cart:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const deleteBuyCart = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = req.body.uid;

    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "id is required for delete" });
    }

    const cartItem = await buycart.findOne({ where: { id, uid } });

    if (!cartItem) {
      return res.status(403).send({
        success: false,
        message: "Not authorized to delete or item not found",
      });
    }

    await buycart.destroy({ where: { id, uid } });
    res.status(200).send("Buy item is deleted");
  } catch (error) {
    console.error("Error deleting buy item:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addBuyCart,
  getAllBuyCart,
  deleteBuyCart,

  deleteAllBuyCart,
};
