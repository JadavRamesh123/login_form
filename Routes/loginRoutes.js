const express=require("express");
const { signUp, login, getDetails, profile } = require("../Controller/loginController");
const { authMiddleware } = require("../Controller/authMiddleware");

const routes=express.Router();

routes.post("/signup",signUp);
routes.post("/login",login);
routes.get("/getDetails",getDetails);
routes.get("/profile",authMiddleware,profile);

module.exports=routes;
