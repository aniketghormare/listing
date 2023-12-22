module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    orderAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return Order;
};
