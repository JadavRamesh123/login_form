const express=require("express");
require("dotenv").config();
const cors=require("cors");
const routes=require("./Routes/loginRoutes");
const { default: mongoose } = require("mongoose");


let common=process.env;
let port=common.PORT;
let mongo_url=common.MONGO_URL;

const app=express();
app.use(express.json());
app.use(cors());
app.use(routes);
mongoose.connect(mongo_url);


app.listen(port,()=>{
    console.log(`Server running at port number is ${port}`); 
})
