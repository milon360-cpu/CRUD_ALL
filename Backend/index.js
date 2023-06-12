const app = require("./app");
require("./Config/Config");
require("dotenv").config();
const PORT = process.env.PORT;


app.listen(PORT,()=>
{
    console.log("Server is Running");
})