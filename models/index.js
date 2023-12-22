const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAlises: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.buys = require("./BuyModel.js")(sequelize, DataTypes);
db.rents = require("./RentModel.js")(sequelize, DataTypes);
db.auctions = require("./AuctionModel.js")(sequelize, DataTypes);
db.tenders = require("./TenderModel.js")(sequelize, DataTypes);
db.jobs = require("./JobModel.js")(sequelize, DataTypes);
db.registers = require("./RegisterModel.js")(sequelize, DataTypes);
db.buycart = require("./BuyCartModel.js")(sequelize, DataTypes);
db.rentcart = require("./RentCartModel.js")(sequelize, DataTypes);
db.payment = require("./PaymentModel.js")(sequelize, DataTypes);

db.PersonalInfo = require("./PersonalInfoModel.js")(sequelize, DataTypes);
db.registers.hasOne(db.PersonalInfo,{foreignKey:"uid"})

db.Order = require("./OrderModel.js")(sequelize, DataTypes);
db.OrderItem = require("./OrderItemModel.js")(sequelize, DataTypes);
db.Product = require("./ProductModel.js")(sequelize, DataTypes);
db.Address = require("./AddressModel.js")(sequelize, DataTypes);



db.Order.hasMany(db.OrderItem, { foreignKey: "orderId" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });

db.Order.hasMany(db.Address, { foreignKey: "orderId" });
db.Address.belongsTo(db.Order, { foreignKey: "orderId" });

db.User = require("./UserModel.js")(sequelize, DataTypes);
db.Post = require("./PostModel.js")(sequelize, DataTypes);



db.User.hasMany(db.Post, { foreignKey: "user_id", as: "postDetails" });
db.Post.belongsTo(db.User, { foreignKey: "user_id", as: "postDetails" });

db.JobApplication = require("./JobApplication.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
