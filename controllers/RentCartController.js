const db = require("../models");

const rentcart = db.rentcart;

const addRentCart = async (req, res) => {
  console.log(req);
  try {
    // if (req.file == undefined) {
    //   return res.send(`You must select a file.`);
    // }
    const { rentid, id, image, title, seller, brand, moq, price, rating } =
      req.body;
    // return res.status(400).json({ message:req});
    //const existingCartItem = await buycart.findOne({ where: { buyid:buyid , uid: { $ne: req.body.uid }, } });
    const existingCartItem = await rentcart.findOne({
      where: { rentid: rentid, uid: req.body.uid },
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

    const rentbuy = await rentcart.create(req.body);
    res.status(200).send(rentbuy);
    console.log(rentbuy);
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

const getAllRentCart = async (req, res) => {
  try {
    const uid = req.body.uid;

    if (!uid) {
      return res.status(400).send({
        success: false,
        message: "uid is required to fetch cart items",
      });
    }

    const cartItems = await rentcart.findAll({ where: { uid } });

    res.status(200).send(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};


const deleteAllRentCart = async (req, res) => {
  try {
    const uid = req.body.uid;

    if (!uid) {
      return res.status(400).send({
        success: false,
        message: "uid is required to delete all items in the cart",
      });
    }

    // Delete all items in the cart for the specified user
    await rentcart.destroy({ where: { uid } });

   // return res.status(200).send(uid);
    res.status(200).send("All items in the cart are deleted");
  } catch (error) {
    console.error("Error deleting all items in the cart:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const deleteRentCart = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = req.body.uid;

    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "id is required for delete" });
    }

    const cartItem = await rentcart.findOne({ where: { id, uid } });

    if (!cartItem) {
      return res.status(403).send({
        success: false,
        message: "Not authorized to delete or item not found",
      });
    }

    await rentcart.destroy({ where: { id, uid } });
    res.status(200).send("Buy item is deleted");
  } catch (error) {
    console.error("Error deleting buy item:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addRentCart,
  getAllRentCart,
  deleteRentCart,
  deleteAllRentCart
};
