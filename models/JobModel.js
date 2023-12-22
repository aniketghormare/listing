module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define("job", {
    post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exp_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sal_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sal_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emp_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    working: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Job;
};
