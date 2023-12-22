module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define("register", {
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING, // Change the data type as needed
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updates: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Register;
};
