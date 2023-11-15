const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname: String,
  lastname: String,
  email: String,
  contact: String,
  state: String,
  city: String,
  password: String,
    auth_key : 
        {
            type: String,
            default: ""
        }
        
});
  
  module.exports = mongoose.model('Registeration', userSchema);
  