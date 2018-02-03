var mongoose=require("mongoose");
var user=new mongoose.Schema({
    email:{type:String,required:true,trim:true},
    password:String,
    fullname:String,
    phone:String,
    fax:String,
    created_at:{type:Date,default:Date.now}
},{collection:"user"});
module.exports=mongoose.model("user",user);
