require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser")
const Blog=require("./models/blog")
const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');
const PORT=process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL)
  .then(e => console.log("MongoDB is Connected"))
  .catch(err => console.error("MongoDB connection error:", err));
const path=require("path");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use(express.static(path.resolve('./public')))
app.use(express.static(path.resolve('./views')))
app.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user, 
        blogs:allBlogs
    });
})

app.use("/user",userRoute);
app.use("/blog",blogRoute);
app.listen(PORT,()=>{
    console.log("Server is Running");
})
