const mongoose=require("mongoose");

let Schema=mongoose.Schema;


let reviewSchema=Schema({
    content:String,
    rating:Number,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model("Review",reviewSchema);