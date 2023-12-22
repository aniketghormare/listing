// Define the Address model
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING, // Use STRING for postal codes if they can include non-numeric characters
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // country: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });

  return Address;
};
