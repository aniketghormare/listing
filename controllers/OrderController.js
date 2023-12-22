const db = require("../models");

const Buy = db.buys;
const Rent = db.rents;
const Tender = db.tenders;
const pagination = require("../helper/pagination");
const User = db.User;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Address = db.Address;
const addOrder = async (req, res) => {
  //   let info = {
  //     image: req.body.image,
  //     title: req.body.title,
  //     seller: req.body.seller,
  //     brand: req.body.brand,
  //     moq: req.body.moq,
  //     price: req.body.price,
  //     rating: req.body.rating,
  //     stock: req.body.stock,
  //   };
  // return res.json({msg:req.body})
  // console.log(req.body)

  const address = await Order.create(req.body);
  res.status(200).send(address);
  console.log(address);
};

// const getAllOrder = async (req, res) => {
//   let user = await Order.findAll({});
//   res.status(200).send(user);
// };

const getAllOrder = async (req, res) => {
  //   let user = await User.findAll({
  //     include: Post,
  //     where: { id: 2 },
  //   });

  //   let user = await User.findAll({
  //     attributes:["name","email"],
  //     include: Post,
  //     where: { id: 2 },
  //   });

  let user = await Order.findAll({
    //attributes:["name","email"],
    include: [
      {
        model: OrderItem,
        // as:"postDetails",
        // attributes:["title",["name","postname"]],
      },
      {
        model: Address,
        // as:"postDetails",
        // attributes:["title",["name","postname"]],
      },
    ],
    where: { uid: req.body.uid },
  });

  res.status(200).send(user);
};

// const getAllOrder = async (req, res) => {
//   const { uid, orderId } = req.body;

//   let user = await Order.findAll({
//     include: [
//       {
//         model: OrderItem,
//       },
//       {
//         model: Address,
//       },
//     ],
//     where: { uid, id: orderId }, // Add filters for uid and orderId
//   });

//   res.status(200).send(user);
// };

// const getAllUser = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const perPage = parseInt(req.query.perPage) || 10;

//   const offset = (page - 1) * perPage;

//   try {
//     // Use Sequelize to retrieve a paginated list of Buy records
//     const buy = await User.findAndCountAll({
//       offset,
//       limit: perPage,
//       order: [["createdAt", "ASC"]],
//     });

//     const totalItems = buy.count; // Get the total count from the result

//     res.status(200).json({
//       items: buy.rows,
//       totalCount: totalItems,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const getOneOrder = async (req, res) => {
  let id = req.params.id;
  let address = await Order.findOne({ where: { id: id } });
  res.status(200).send(address);
};

const updateOrder = async (req, res) => {
  let id = req.params.id;
  let address = await Order.update(req.body, { where: { id: id } });
  res.status(200).send(address);
};

const deleteOrder = async (req, res) => {
  let id = req.params.id;
  await Order.destroy({ where: { id: id } });
  res.status(200).send("tender is deleted");
};
// const getPublishedBuy=async(req,res)=>{

//     let products = await Product.findAll({where:{published:true}});
//     res.status(200).send(products);

// }
const paginationdata = async (req, res) => {
  const { page, limit } = req.query;
  const { newlimit, offset } = await pagination.getPagination(page, limit);
  const lm = parseInt(limit);
  await User.findAndCountAll({
    limit: lm,
    offset: offset,
  })
    .then((data) => {
      const resp = pagination.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        data: resp,
        message: "Services Fetched Successfully !!",
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
};
module.exports = {
  addOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
  //paginationdata
  // getPublishedProduct
};
