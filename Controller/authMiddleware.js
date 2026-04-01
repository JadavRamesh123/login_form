const db=require("../Model/loginModel");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware=async (req,res,next)=>{

    let token=req.headers.authorization;
    let decoded=await jwt.verify(token,process.env.SECRET_KEY);
    let data=await db.findById(decoded.id).select("-password");
    res.json({message:"profile page loaded",data});
    next();
    
}