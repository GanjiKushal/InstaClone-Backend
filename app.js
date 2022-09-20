const express=require("express")
const mongoose=require("mongoose")
const app = express()
// const bodyParser = require("body-parser");
const cors=require("cors")
const cloudniaryModule=require('cloudinary')

const cloudinary=cloudniaryModule.v2

cloudinary.config({
    cloud_name:"dtnud4out",
    api_key:'664851891649345',
    api_secret:'F8CJ60_jFwwWF4uP40PB9QlTbfA'
})
const data=require('./schema')
const port = 8080
app.use(express.urlencoded());
mongoose.connect('mongodb+srv://kushal:Kushal24@cluster0.q2aawhd.mongodb.net/test',()=>{
    console.log("Its connected")
})

// Parse JSON bodies (as sent by API clients)

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors())

app.get("/",async (req,res)=>{
    const b=await data.find().sort({_id:-1})
    res.status(200).json(b)
})
app.post("/alldata", async (req,res)=>{
    // console.log(req.file.filename)
    
   const {name,location,description,PostImage}=req.body
   if(PostImage){
    const uploadres=await cloudinary.uploader.upload(PostImage,{
        upload_preset:'instaclone'
   })
    const a=await data.create({
        name,
        location,
        likes:'0',
        description,
        PostImage:uploadres.url,
        date:"10/05/2021"
    })
    console.log(a)
    // res.send(a)
    res.status(200).json({
        message:"sucess"
    })
    
}
})

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   