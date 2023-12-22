const db = require("../models/index")
const User = db.user
const  getUserByToken = async (token) => {
  
const Users = await User.findOne({where : {auth_token : token}})
     
    return Users;
    
};

module.exports = {
    getUserByToken,
}
