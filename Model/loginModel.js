const db=require('mongoose');

const details=new db.Schema({
    name:{
        required:true,
        type:String,
    },
      email:{
        required:true,
        type:String,
        unique:true,
    },
      password:{
        required:true,
        type:String,
    },
});
module.exports=db.model("Login",details,"Login");