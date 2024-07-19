const mongoose=require("mongoose");
let Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    //passport-local-mongoose automatically add username and password feild with hash function and salting.
    email:{
        type:String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports=new mongoose.model("User",userSchema);