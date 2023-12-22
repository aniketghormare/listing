const db = require("../models");
const pagination = require("../helper/pagination");
const Buy = db.buys;
const Rent = db.rents;

const addBuy = async (req, res) => {
  console.log(req)
  try {
    // if (req.file == undefined) {
    //   return res.send(`You must select a file.`);
    // }
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

    const buy = await Buy.create(info);
    res.status(200).send(buy);
    console.log(buy);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

// const getAllBuy = async (req, res) => {
  
//   // let buy = await Buy.findAll({});
//   // res.status(200).send(buy);



//   const page = parseInt(req.query.page) || 1; // Get the page number from query parameter, default to 1 if not provided
//   const perPage = parseInt(req.query.perPage) || 10; // Get the number of items per page, default to 10 if not provided

//   // Calculate the offset based on the page and perPage values
//   const offset = (page - 1) * perPage;

//   try {
//     // Use Sequelize to retrieve a paginated list of Buy records
//     const buy = await Buy.findAll({
//       offset,
//       limit: perPage,
//       order: [['createdAt', 'ASC']] // You can change the sorting order as needed
//     });

//     res.status(200).send(buy);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

const getAllBuy = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const offset = (page - 1) * perPage;

  try {
    // Use Sequelize to retrieve a paginated list of Buy records
    const buy = await Buy.findAndCountAll({
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
    res.status(500).send('Internal Server Error');
  }
};


const getOneBuy = async (req, res) => {
  let id = req.params.id;
  let buy = await Buy.findOne({ where: { id: id } });
  res.status(200).send(buy);
};

const updateBuy = async (req, res) => {
  let id = req.params.id;
  let buy = await Buy.update(req.body, { where: { id: id } });
  res.status(200).send(buy);
};

const deleteBuy = async (req, res) => {
  let id = req.params.id;
  if (id === undefined) {
    return res
      .status(403)
      .send({ success: false, message: "id required for delete " });
  }
  await Buy.destroy({ where: { id: id } });
  res.status(200).send("buy is deleted");
};
// const getPublishedBuy=async(req,res)=>{

//     let products = await Product.findAll({where:{published:true}});
//     res.status(200).send(products);

// }
// const getAdminService = async (req, res) => {
//   const { page, limit } = req.query;
//   const { newlimit, offset } = await pagination.getPagination(page, limit);
//   const lm = parseInt(limit);
//   await Buy.findAndCountAll({
//     limit: lm,
//     offset: offset,
//   })
//     .then((data) => {
//       const resp = pagination.getPagingData(data, page, limit);
//       res.status(200).json({
//         success: true,
//         data: resp,
//         message: "Services Fetched Successfully !!",
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({ success: false, message: err.message });
//     });

//   // let buy = await Buy.findAll({});
//   // res.status(200).send(buy);
// };

const paginationdata = async (req, res) => {
  const { page, limit } = req.query;
  const { newlimit, offset } = await pagination.getPagination(page, limit);
  const lm = parseInt(limit);
  await Buy.findAndCountAll({
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
  addBuy,
  getAllBuy,
  getOneBuy,
  updateBuy,
  deleteBuy,
  paginationdata,
  // getPublishedProduct
};
