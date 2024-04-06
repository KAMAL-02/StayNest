const User = require("../models/user")

//Render signup form
module.exports.renderSignUpForm = (req , res) =>{
    res.render("users/signup.ejs");
};

//To signup
module.exports.signup = async(req , res) =>{
    try{
        let{username , email , password} = req.body ;
        const newUser = new User({email , username});
        const regUser = await User.register(newUser , password);
        console.log(regUser);
        req.login(regUser , (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success" , "Registered successfully");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error" , err.message);
        res.redirect("/signup");
    }
};

//Render login form
module.exports.renderLoginForm = (req , res) =>{
    res.render("users/login.ejs");
};

//After Login
module.exports.login = async(req , res) =>{
    req.flash( "success" , "Welcome Back!");
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
};

//for logout
module.exports.logout =  (req , res ,next)=>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success" , "you are logged out now");
        res.redirect("/listings");
    });
};