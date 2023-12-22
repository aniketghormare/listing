const db = require("../models");
const pagination = require("../helper/pagination");
const Buy = db.buys;
const Rent = db.rents;
const Job = db.jobs;
const addJob = async (req, res) => {
  let info = {
    post: req.body.post,
    exp_start: req.body.exp_start,
    exp_end: req.body.exp_end,
    education: req.body.education,
    company: req.body.company,
    description: req.body.description,
    sal_start: req.body.sal_start,
    sal_end: req.body.sal_end,
    place: req.body.place,
    emp_start: req.body.emp_start,
    emp_end: req.body.emp_end,
    working: req.body.working,
  };

  const job = await Job.create(info);
  res.status(200).send(job);
  console.log(job);
};

// const getAllJob = async (req, res) => {
//   //   let products = await Product.findAll({
//   //     attributes:[
//   //         "title",
//   //         "price"
//   //     ]
//   //   });
//   let job = await Job.findAll({});
//   res.status(200).send(job);
// };

const getAllJob = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const offset = (page - 1) * perPage;

  try {
    // Use Sequelize to retrieve a paginated list of Buy records
    const buy = await Job.findAndCountAll({
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

const getOneJob = async (req, res) => {
  let id = req.params.id;
  let job = await Job.findOne({ where: { id: id } });
  res.status(200).send(job);
};

const updateJob = async (req, res) => {
  let id = req.params.id;
  let job = await Job.update(req.body, { where: { id: id } });
  res.status(200).send(job);
};

const deleteJob = async (req, res) => {
  let id = req.params.id;
  await Job.destroy({ where: { id: id } });
  res.status(200).send("job is deleted");
};
// const getPublishedBuy=async(req,res)=>{

//     let products = await Product.findAll({where:{published:true}});
//     res.status(200).send(products);

// }
const paginationdata = async (req, res) => {
  const { page, limit } = req.query;
  const { newlimit, offset } = await pagination.getPagination(page, limit);
  const lm = parseInt(limit);
  await Job.findAndCountAll({
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
  addJob,
  getAllJob,
  getOneJob,
  updateJob,
  deleteJob,
  paginationdata,
  // getPublishedProduct
};
