const db = require("../models");
const pagination = require("../helper/pagination");
const Buy = db.buys;
const Rent = db.rents;
const Payment = db.payment;
const Razorpay = require("razorpay");

const orderCreate = async (req, res) => {
  const { order_id, amount, payment_capture, currency } = req.body;
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_Fbyu1RzXhu3iVj",
      key_secret: "skNTpj0HZUk2HHkSZQKZ10y3",
    });

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: order_id,
      payment_capture: payment_capture,
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("something went wrong");
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.json({ msg: err });
  }
};

const cardDetail = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_Fbyu1RzXhu3iVj",
      key_secret: "skNTpj0HZUk2HHkSZQKZ10y3",
    });

    const { id } = req.body;
    const order = await instance.payments.fetch(id);

    if (!order) return res.status(500).send("something went wrong");
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.log(err);
    res.status(400).json({ data: err });
  }
};

const getAllPayment = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const offset = (page - 1) * perPage;

  try {
    // Use Sequelize to retrieve a paginated list of Buy records
    const buy = await Payment.findAndCountAll({
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

const getOnePayment = async (req, res) => {
  let id = req.params.id;
  let buy = await Payment.findOne({ where: { id: id } });
  res.status(200).send(buy);
};

const updatePayment = async (req, res) => {
  let id = req.params.id;
  let buy = await Payment.update(req.body, { where: { id: id } });
  res.status(200).send(buy);
};

const deletePayment = async (req, res) => {
  let id = req.params.id;
  if (id === undefined) {
    return res
      .status(403)
      .send({ success: false, message: "id required for delete " });
  }
  await Payment.destroy({ where: { id: id } });
  res.status(200).send("buy is deleted");
};

const paginationdata = async (req, res) => {
  const { page, limit } = req.query;
  const { newlimit, offset } = await pagination.getPagination(page, limit);
  const lm = parseInt(limit);
  await Payment.findAndCountAll({
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
  getAllPayment,
  getOnePayment,
  updatePayment,
  deletePayment,
  paginationdata,
  orderCreate,
  cardDetail,
};
