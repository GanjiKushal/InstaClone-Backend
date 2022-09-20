const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:String,
    location:String,
    likes:Number,
    description:String,
    PostImage:String,
    date:String
},{timestamps:true})

const Blog=mongoose.model('Blog',userSchema)
module.exports=Blog