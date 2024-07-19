const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn ,isAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")


//review
//POST Review Route
router.post("",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//DELETE Review Route
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.deleteReview));


module.exports = router;