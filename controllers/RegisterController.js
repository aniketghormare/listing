const db = require("../models");
const bcrypt = require("bcrypt");
const Buy = db.buys;
const Rent = db.rents;
const Job = db.jobs;
const Register = db.registers;
require("dotenv").config()
const jwt = require("jsonwebtoken");
const addRegister = async (req, res) => {
  try {
    const existingUser = await Register.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res
        .status(200)
        .json({ msg: "User already exists, please log in" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 5);

    const userInfo = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      updates: req.body.updates,
      mobile:req.body.mobile,
      uid: `${new Date().getTime()}${req.body.fname}${Math.floor(
        Math.random() * 100
      )}`,
    };

    const newUser = await Register.create(userInfo);
    return res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "An error occurred while processing your request" });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Register.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ msg: "Invalid Email" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // If the password is correct, create a JWT token
    const token = jwt.sign({ userId: user.uid }, process.env.SECRETID, {
      expiresIn: "1h", // Token expiration time (adjust as needed)
    });

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "An error occurred while processing your request" });
  }
};

const getAllRegister = async (req, res) => {
  //   let products = await Product.findAll({
  //     attributes:[
  //         "title",
  //         "price"
  //     ]
  //   });
  let register = await Register.findAll({});
  res.status(200).send(register);
};

const getOneRegister = async (req, res) => {
  let id = req.params.id;
  let register = await Register.findOne({ where: { id: id } });
  res.status(200).send(register);
};

const updateRegister = async (req, res) => {
  let id = req.params.id;
  let register = await Register.update(req.body, { where: { id: id } });
  res.status(200).send(register);
};

const deleteRegister = async (req, res) => {
  let id = req.params.id;
  await Register.destroy({ where: { id: id } });
  res.status(200).send("job is deleted");
};
// const getPublishedBuy=async(req,res)=>{

//     let products = await Product.findAll({where:{published:true}});
//     res.status(200).send(products);

// }
module.exports = {
  addRegister,
  getAllRegister,
  getOneRegister,
  updateRegister,
  deleteRegister,
  loginuser,
  // getPublishedProduct
};
