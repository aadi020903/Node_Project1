const jwt = require("jsonwebtoken");
const adminModel = require("../model/admin");

module.exports = async (req, res, next) => {
  try {
    console.log("cookies",req.cookies.jwt)
    
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      console.log("token ",token);
      const { _id}  = jwt.verify(token, process.env.JWT_SECRET);
      console.log("id ",_id);
      req.user = await adminModel.findOne({ _id });
      console.log("user ",req.user);
      if (req.user) {

        next();
      } else {
        res.render("login");
      }
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
