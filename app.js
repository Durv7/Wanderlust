const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}));

app.engine("ejs",ejsMate);
main().then(res=>{
    console.log("Connected To DB");
}).catch(err=>{
    console.log(err);
})

async function main()
{
    mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

app.get("/",(req,res)=>{
    res.send("Its Root");
})

//index route.
app.get("/listings",async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//READ route(show)
app.get("/listings/:id",async (req,res)=>{
    let { id }=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//create route
app.post("/listings",wrapAsync(async(req,res,next)=>{
        let result=listingSchema.validate(req.body);
        console.log(result);
        if(result.error)
        {
            throw new ExpressError("400",result.error);
        }
        let newlisting=new Listing(req.body.listing);
        // console.log(newlisting);
        await newlisting.save();
       res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route
app.put("/listings/:id",wrapAsync(async (req,res,next)=>{
    // if(!req.body.listing)
    // {
    //     throw new ExpressError(400,"Send Valid Data!");
    // }
    let { id }=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//DELETE route
app.delete("/listings/:id",async(req,res)=>{
    let {id }=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found !!"));
})

app.use((err,req,res,next)=>{//Error handeling middleware.
    let{status=500,message="Something Goes Wrong"}=err; 
    res.render("listings/error.ejs",{err});
    // res.status(status).send(message);
});


app.listen(8080,()=>{
    console.log("Listening On Port 8080");
});

