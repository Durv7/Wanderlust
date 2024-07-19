const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersController=require("../controllers/users.js");

//router.route helps to compact the code.


router.route("/signup")
.get(wrapAsync(usersController.rendreSignUpForm) )//signUp form
.post( wrapAsync(usersController.userSignup));
//actual signup

router.route("/login")
.get( wrapAsync(usersController.renderLoginForm))//login form
.post(saveRedirectUrl ,//saveRedirectUrl saves the url of path through which requested.
    passport.authenticate("local", { failureRedirect: "/login" ,failureFlash: true }),
    wrapAsync(usersController.userLogin));//actual login 

//logout
router.get("/logout",usersController.userLogout);


module.exports = router;