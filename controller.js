const e = require('express');
const { registerservice,loginservice } = require('./service'); 
// let firstname = "";

exports.homecontroller = async(req, res) =>{
    // res.send("Welcome to the home page");
    res.render('register');
}

exports.registercontroller = async (req, res) =>{
   let data = await registerservice(req);
    if(data.success){
        res.render('welcome', {firstname: data.firstname });
        console.log(data.message);
    }
}

exports.logincontroller= async(req, res) => {
    res.render('login');
}

exports.logincheckcontroller = async(req, res) => {
       let data = await loginservice(req,res);
    if(data.success== true){
        res.redirect(`dashboard?data=${data.firstname}`);
        console.log(data.message);
        console.log(req.cookies.jwt)
        // firstname = data.firstname;
    }
    else if(data.success==false){
        res.render('login')
        console.log(data.message);
    
    }
    
    }
exports.dashboardcontroller = async(req, res) => {

    let perviousurl = req.get('Referrer');
    console.log(perviousurl);
    if(perviousurl == "http://localhost:5000/login"){
        // console.log(req.query.data); 
        
        res.render('dashboard', {firstname: req.query.data});
    }
    else
    {
        res.redirect('/login');
    }
}