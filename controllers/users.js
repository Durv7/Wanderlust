const User = require("../models/user.js");

module.exports.rendreSignUpForm=(req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.userSignup=async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser,(err)=>{
            if(err)
            {
               return next(err);
            }

            req.flash("success", "Welcome To Wanderlust!!");
            res.redirect("/listings");
        })

        
    } catch (error) {   
        req.flash("error",error.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=async (req, res) => {
    res.render("./users/login.ejs")
}

module.exports.userLogin=async (req,res) => {
    req.flash("success", "Welcome Back To Wonderlust!!");

    let redirectUrl=res.locals.redirectUrl || "/listings";
    // console.log(redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.userLogout=(req,res,next)=>{
    req.logout((err)=>{//logout function automatically log out user from current session.
        if(err)
        {
            return next(err);
        }
        req.flash("success", "You Logged Out !");
        res.redirect("/listings");
    })

}
