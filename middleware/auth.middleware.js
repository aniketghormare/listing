const jwt = require("jsonwebtoken");
require("dotenv").config()
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRETID);
      if (decoded) {
        req.body.uid=decoded.userId
        //console.log(`ans is ${decoded}`)
        next();
      } else {
        res.status(200).send("Not Authorised");
      }
    } catch (err) {
      res.json({ err: err });
    }
  } else {
    res.json({ msg: "Please Login First!" });
  }
};


module.exports={
    auth
}
