const express = require('express');
const router = express.Router();
const adminauth =require("./middleware/adminauth")
const {homecontroller , registercontroller ,logincheckcontroller,logincontroller,dashboardcontroller} = require('./controller');

router.get('/',homecontroller);    

router.post('/register',registercontroller);

router.get('/login', logincontroller)

router.get('/dashboard',dashboardcontroller)
router.post('/login',logincheckcontroller )


module.exports = router;