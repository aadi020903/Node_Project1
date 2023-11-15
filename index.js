const express = require('express');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
require("dotenv").config();
const {dbconnect} = require('./dbconnect');
const app = express();
const routes = require('./route')
dbconnect();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('', routes);

app.listen(port, () => {
    console.log(`Server is running`);
})
