module.exports = (sequelize, DataTypes) => {
  const PersonalInfo = sequelize.define("PersonalInfo", {
    fullName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.BLOB,
    },
    streetAddress: {
      type: DataTypes.STRING,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return PersonalInfo;
};
