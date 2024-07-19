const Listing=require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema, newlistingSchema, editlistingSchema } = require("./schema.js");
const Review=require("./models/review.js");

module.exports.isLoggedIn=(req,res,next)=>{
    req.session.redirectUrl=req.originalUrl;
    if(!req.isAuthenticated())//isAuthenticated() function checks whether user already logged in or not.
    {
        req.flash("error","You Must Logged In ");
        return res.redirect("/login");
    }
    next();
}

//by default req.session gets refreshed after passport.authenticated() middleware.

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl;
        
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You are not a owner of this review.");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.validateNewListing = (req, res, next) => {
    let { error } = newlistingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateEditListing = (req, res, next) => {
    let { error } = editlistingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.isAuthor=async(req,res,next)=>{
    let {id, reviewId } = req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You are not a author of this review.");
        return res.redirect(`/listings/${id}`)
    }
    next();
}


