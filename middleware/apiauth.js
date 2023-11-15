
const jwt = require("jsonwebtoken");
const userModel = require("../model/admin");
const auth = async (req, res, next) => {
  try {
    //console.log("-------------req.url--------------------------",req.url);
    const token = req.header("Authorization").replace("Bearer ", "");
    //console.log("verify", token);
    const decoded = jwt.verify(token, constant.SECRET_TOKEN);
    let data = await userModel.findOne(decoded);
    //console.log("data",data.status=="activated")
    if (data.status == "blocked") {
      return res.status(401).json(
        Object.assign(
          { success: false },
          {
            status: false,
            msg: "User is blocked",
          }
        )
      );
    }

    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (e) {
    token = {
      status: false,
      msg: "Invalid Token",
    };
    return res.status(401).json(Object.assign({ success: false }, token));
  }
};
module.exports = auth;