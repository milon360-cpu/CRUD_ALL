const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.URL;

mongoose.connect(url)
.then(()=>
{
    console.log("db is connected");
})
.catch((error)=>
{
    console.log(error.message);
    process.exit();
})