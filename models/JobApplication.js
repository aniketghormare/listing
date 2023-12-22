module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define("jobapplication", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobPosition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    highestQualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    relocate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    currentCtc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expectedCtc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return JobApplication;
};
