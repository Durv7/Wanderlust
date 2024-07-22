if(process.env.NODE_ENV != "process")
{
    require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listingRouter=require("./routes/listings.js");
const reviewRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const User=require("./models/user.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");

let dbUrl=process.env.ATLAS_URL;

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
    mongoose.connect(dbUrl);
}

const store=MongoStore.create({
    mongoUrl:dbUrl,
    touchAfter: 24 * 3600 ,
    crypto:{
        secret:process.env.SECRET
    }
})

store.on("error",()=>{
    console.log("Error In Mongo Session Store.",err);
})

let sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }   
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());//for every req passport gets initilized.
app.use(passport.session());//function helps to authenticate user throuout one session.
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//serializing means storing information related to user in  session.
passport.deserializeUser(User.deserializeUser());//deserializing means removing information.


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.get("/demouser",async(req,res)=>{
    let fakeUser=new User({
        email:"user1@gmail.com",
        username:"user1",
    });

    let registeredUser= await User.register(fakeUser,"helloworld"); //register method used to save user login info to DB. it automatically checks uniqueness of username.
    res.send(registeredUser);
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

