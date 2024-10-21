const {Router}=require("express");
const {User}=require('../models/user');
const router=Router();

router.get('/signin',(req,res)=>{
    return res.render("signin");
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await User.matchPasswordAndGenerateToken(email,password)
    console.log('token',token);
    return res.cookie('token',token).redirect("/"); 
    }
    catch(e){
        return res.render('signin',{
            e:"Incorrect Email or password"
        });
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect('/')
})
router.post("/signup",async(req,res)=>{
    const {fullName,email,password}=req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // If user doesn't exist, create new user
        const newUser = new User({
            fullName,
            email,
            password,
        });
        await newUser.save();
        return res.redirect("/");
    } catch (error) {
        console.error("Error in user signup:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
module.exports=router;