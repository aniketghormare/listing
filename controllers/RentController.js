const db = require("../models");
const pagination = require("../helper/pagination");
const Buy = db.buys;
const Rent = db.rents;
//const { Sequelize, Op } = require('sequelize');
const addRent = async (req, res) => {
  let info = {
    image: req.body.image,
    title: req.body.title,
    seller: req.body.seller,
    brand: req.body.brand,
    moq: req.body.moq,
    price: req.body.price,
    rating: req.body.rating,
    stock: req.body.stock,
  };

  const rent = await Rent.create(info);
  res.status(200).send(rent);
  console.log(rent);
};

// const getAllRent = async (req, res) => {
//   //   let products = await Product.findAll({
//   //     attributes:[
//   //         "title",
//   //         "price"
//   //     ]
//   //   });
//   let rent = await Rent.findAll({});
//   res.status(200).send(rent);
// };

const getAllRent = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const offset = (page - 1) * perPage;

  try {
    // Use Sequelize to retrieve a paginated list of Buy records
    const buy = await Rent.findAndCountAll({
      offset,
      limit: perPage,
      order: [['createdAt', 'ASC']]
    });

    const totalItems = buy.count; // Get the total count from the result

    res.status(200).json({
      items: buy.rows,
      totalCount: totalItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getOneRent = async (req, res) => {
  let id = req.params.id;
  let rent = await Rent.findOne({ where: { id: id } });
  res.status(200).send(rent);
};

const updateRent = async (req, res) => {
  let id = req.params.id;
  let rent = await Rent.update(req.body, { where: { id: id } });
  res.status(200).send(rent);
};

const deleteRent = async (req, res) => {
  let id = req.params.id;
  await Rent.destroy({ where: { id: id } });
  res.status(200).send("rent is deleted");
};
// const getPublishedBuy=async(req,res)=>{

//     let products = await Product.findAll({where:{published:true}});
//     res.status(200).send(products);

// }
const paginationdata = async (req, res) => {
  const { page, limit } = req.query;
  const { newlimit, offset } = await pagination.getPagination(page, limit);
  const lm = parseInt(limit);
  await Rent.findAndCountAll({
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
// const paginationdata = async (req, res) => {
//   try {
//     const { page, limit, search } = req.query;
//     const { newlimit, offset } = await pagination.getPagination(page, limit);
//     const lm = parseInt(newlimit);

//     const filter = {
//       // Add a filter for the 'title' field based on the 'search' query parameter
//       title: { [Op.iLike]: `%${search}%` }, // Case-insensitive search
//     };

//     const data = await Rent.findAndCountAll({
//       limit: lm,
//       offset: offset,
//       where: filter, // Apply the filter
//     });

//     const resp = pagination.getPagingData(data, page, limit);
//     res.status(200).json({
//       success: true,
//       data: resp,
//       message: "Services Fetched Successfully !!",
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

module.exports = {
  addRent,
  getAllRent,
  getOneRent,
  updateRent,
  deleteRent,
  paginationdata,
  // getPublishedProduct
};
