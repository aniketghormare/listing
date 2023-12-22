const db = require("../models");

const Buy = db.buys;
const Rent = db.rents;
const Tender = db.tenders;
const pagination = require("../helper/pagination");
const Post = db.Post;
const addPost = async (req, res) => {
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

  const address = await Post.create(req.body);
  res.status(200).send(address);
  console.log(address);
};
const getAllPost = async (req, res) => {
    //   let products = await Product.findAll({
    //     attributes:[
    //         "title",
    //         "price"
    //     ]
    //   });
    let post = await Post.findAll({});
    res.status(200).send(post);
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

// const getAllPost = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const perPage = parseInt(req.query.perPage) || 10;

//   const offset = (page - 1) * perPage;

//   try {
//     // Use Sequelize to retrieve a paginated list of Buy records
//     const buy = await Post.findAndCountAll({
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

const getOnePost = async (req, res) => {
  let id = req.params.id;
  let address = await Post.findOne({ where: { id: id } });
  res.status(200).send(address);
};

const updatePost = async (req, res) => {
  let id = req.params.id;
  let address = await Post.update(req.body, { where: { id: id } });
  res.status(200).send(address);
};

const deletePost = async (req, res) => {
  let id = req.params.id;
  await Post.destroy({ where: { id: id } });
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
  await Post.findAndCountAll({
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
  addPost,
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
  //paginationdata
  // getPublishedProduct
};
