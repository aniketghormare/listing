module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
  return Product;
};
