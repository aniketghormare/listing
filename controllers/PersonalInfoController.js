const db = require("../models");

const Buy = db.buys;
const Rent = db.rents;
const Tender = db.tenders;
const pagination = require("../helper/pagination");
const PersonalInfo = db.PersonalInfo;
const registerController = {
  addPersonalInfo: async (req, res) => {
    // Add other controller methods as needed

    //
    try {
      const uid = req.body.uid;

      // Check if the user already exists in the database
      const existingUser = await PersonalInfo.findOne({ where: { uid } });

      if (existingUser) {
        // If the user exists, perform a PATCH request to update the user's data

        const updatedInfo = await PersonalInfo.update(req.body, {
          where: { uid },
        });

        // console.log("Updated user in the database:", updatedUser);

        // Respond with success message or other appropriate response for PATCH request
        return res
          .status(200)
          .json({ message: "User updated successfully", data: updatedInfo });
      }

      // If the user doesn't exist, perform a POST request to create a new user
      const createdFormData = await PersonalInfo.create(req.body);

      console.log("Saved to database:", createdFormData);

      // Respond with success message or other appropriate response for POST request
      return res
        .status(201)
        .json({ message: "Registration successful", data: createdFormData });
    } catch (error) {
      console.error("Error saving/updating user to database:", error);

      // Respond with an error message or other appropriate response
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPersonalInfo: async (req, res) => {
    try {
      const uid = req.body.uid;

      // Check if the user already exists in the database
      const existingUser = await PersonalInfo.findOne({ where: { uid } });
      if (existingUser) {
        return res
          .status(200)
          .json({ message: "User updated successfully", data: existingUser });
      }
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  //
};

module.exports = registerController;
