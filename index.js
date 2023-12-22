const express = require("express");
const cors = require("cors");
require("./config/dbconfig.js");
require("dotenv").config();
const app = express();
const PORT = 10006;
var corOptions = {
  origin: "https://localhost:10006",
  // origin: "*",
};
// middlewares
app.use(cors(corOptions));
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

const buyrouter = require("./routes/BuyRoute.js");
app.use("/api/buy", buyrouter);

const rentrouter = require("./routes/RentRoute.js");
app.use("/api/rent", rentrouter);

const auctionrouter = require("./routes/AuctionRoute.js");
app.use("/api/auction", auctionrouter);

const tenderrouter = require("./routes/TenderRoute.js");
app.use("/api/tender", tenderrouter);

const jobrouter = require("./routes/JobRoute.js");
app.use("/api/job", jobrouter);

const registerrouter = require("./routes/RegisterRoute.js");
app.use("/api/register", registerrouter);

const buycartrouter = require("./routes/BuyCart.js");
app.use("/api/buycart", buycartrouter);

const rentcartrouter = require("./routes/RentCart.js");
app.use("/api/rentcart", rentcartrouter);

const paymentrouter = require("./routes/Payment.js");
app.use("/api/payment", paymentrouter);

const orderrouter = require("./routes/OrderRoute.js");
app.use("/api/order", orderrouter);

const orderitemrouter = require("./routes/OrderItemRoute.js");
app.use("/api/orderitem", orderitemrouter);

const addressrouter = require("./routes/AddressRoute.js");
app.use("/api/address", addressrouter);

const personalinforouter = require("./routes/PersonalInfoRoute.js");
app.use("/api/personalInfo", personalinforouter);

const userrouter = require("./routes/UserRoute.js");
app.use("/api/user", userrouter);

const postrouter = require("./routes/PostRoute.js");
app.use("/api/post", postrouter);

const jobapplicationrouter = require("./routes/JobApplicationRoute.js");
app.use("/api", jobapplicationrouter);

app.get("/", (req, res) => {
  res.json({ msg: "getting data" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is connected at port ${process.env.PORT}`);
});
