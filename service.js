const Model = require("./model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerservice = async (req) => {
  try {
        // const token = await auth();
//     console.log("Hello buddy" + this._id);
    const token = await jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashPassword);
    let userData = new Model({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      contact: req.body.contact,
      state: req.body.state,
      city: req.body.city,
      password: hashPassword,
    });

    let user_Data = await userData.save();
    if (user_Data) {
      return {
        message: "data saved successfully",
        firstname: req.body.firstname,
        data: user_Data,
        success: true,
      };
    } else {
      return {
        message: "data did not save",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginservice = async (req,res) => {
  // const firstname = req.body.firstname;
  const password = req.body.password;
  const email = req.body.email;

    try {
        let foundUser = await Model.findOne({ email: email });
        console.log(foundUser);
        if (foundUser) {
            let result = await bcrypt.compare(password, foundUser.password);
            // console.log(result);
            if (result== true) {

                const token = await jwt.sign(
                  {
                      _id:result._id
                     
                  },
                  process.env.JWT_SECRET,
                 
                  )

                  // await Model.findByIdAndUpdate({ email: email },{auth_key:token});
                  await Model.findByIdAndUpdate(foundUser._id,{auth_key:token});
                  res.cookie("jwt",token,{
                   httpOnly:true
                  })
                  
                  let firstname = foundUser.firstname;  
                return {
                    firstname:firstname,
                    message: "User Found",
                    success: true,
                    
                }



                  
             
                
               
              
                
            } else {
                return {
                    message: "User Not Found INVALID CREDENTIALS",
                    success: false,
                };
            }
        } else {
            return {
                message: "User Not Found INVALID CREDENTIALS",
                success: false,
            };
        }
    }catch (error) {
        console.log(error);
    }
}

