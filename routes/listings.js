const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateNewListing,validateEditListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');//multer package helps to read "multipart/form-data" from the form.
const {storage}=require("../cloudConfig.js");
const Listing = require("../models/listing.js");
const upload = multer({ storage });


router.route("/")
.get(listingController.index )//index route.
.post(isLoggedIn,upload.single("listing[image]"),  validateNewListing, listingController.createListing);//create route

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm)

//filtered listing
router.get("/filter",listingController.filteredListing);

router.get("/search",listingController.searchListing);

router.route("/:id")
.get(wrapAsync( listingController.showListing ))//READ route(show)
.put(isLoggedIn,isOwner,upload.single("listing[image]"),  validateEditListing, wrapAsync(listingController.updateListing))//update route
.delete(isLoggedIn,isOwner,wrapAsync( listingController.destroyListing ));//DELETE route



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,  wrapAsync( listingController.renderEditForm ));

module.exports = router;