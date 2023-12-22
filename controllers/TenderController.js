const db = require("../models");

const Buy = db.buys;
const Rent = db.rents;
const Tender = db.tenders;
const pagination = require("../helper/pagination");
const addTender = async (req, res) => {
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

  const tender = await Tender.create(info);
  res.status(200).send(tender);
  console.log(tender);
};

// const getAllTender = async (req, res) => {
//   //   let products = await Product.findAll({
//   //     attributes:[
//   //         "title",
//   //         "price"
//   //     ]
//   //   });
//   let tender = await Tender.findAll({});
//   res.status(200).send(tender);
// };

const getAllTender = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const offset = (page - 1) * perPage;

  try {
    // Use Sequelize to retrieve a paginated list of Buy records
    const buy = await Tender.findAndCountAll({
      offset,
      limit: perPage,
      order: [["createdAt", "ASC"]],
    });

    const totalItems = buy.count; // Get the total count from the result

    res.status(200).json({
      items: buy.rows,
      totalCount: totalItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getOneTender = async (req, res) => {
  let id = req.params.id;
  let tender = await Tender.findOne({ where: { id: id } });
  res.status(200).send(tender);
};

const updateTender = async (req, res) => {
  let id = req.params.id;
  let tender = await Tender.update(req.body, { where: { id: id } });
  res.status(200).send(tender);
};

const deleteTender = async (req, res) => {
  let id = req.params.id;
  await Tender.destroy({ where: { id: id } });
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
  await Tender.findAndCountAll({
    limit: lm,
    offset: offset
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
  addTender,
  getAllTender,
  getOneTender,
  updateTender,
  deleteTender,
  paginationdata
  // getPublishedProduct
};
