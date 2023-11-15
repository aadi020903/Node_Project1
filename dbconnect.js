
const mongoose = require('mongoose');
const DBurl = process.env.MONGODB_URL
const DBname = process.env.DB_NAME
const DB_Connect = DBurl+DBname 


// mongoose.connect(`${process.env.MONGODB_URL}${process.env.DB_NAME}`)
// console.log("Database connected successfully");

console.log("We are in dbconnect.js");
exports.dbconnect = async (req, res) => {
  mongoose.connect(DB_Connect);
  console.log("Database connected successfully");
};
