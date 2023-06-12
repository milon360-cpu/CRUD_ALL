const express = require("express");
const cors = require("cors");
const router = require("./Router/UserRouter");
const app = express();

app.use(cors());
app.use(router);
// Routing Error 
app.use((req,res,next)=>
{ 
    res.status(404).send 
    (
        {
                success : false,
                message : "Page not found",
                status: 404
        }
    )
})

// Server Error  
app.use((error,req,res,next)=>
{
    if(error)
    {
        res.status(500).send
            (
                {
                    success : false,
                    message : error.message,
                    status : 500
                }
            )
    } 
})


module.exports = app;