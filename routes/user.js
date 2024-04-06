const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js")

//signup get route for signup form and post route to implement it
router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signup));

//user login form get and post
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
passport.authenticate("local" , {failureRedirect: "/login", failureFlash: true}) ,
userController.login);

//user logout
router.get("/logout" ,userController.logout);

module.exports = router;