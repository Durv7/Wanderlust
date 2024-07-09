const mongoose=require("mongoose");

let Schema=mongoose.Schema;

let listingSchema=Schema({
    title:
    {
      type:String,
      required:true
    },
    description:String,
    image:
    {
        type:String,
        default:"https://media.istockphoto.com/id/1295744448/photo/guest-house-in-middle-of-natural-surroundings-of-coconut-tree-plantation-pollachi-tamil-nadu.webp?b=1&s=170667a&w=0&k=20&c=86IrdNp7yFVqlGwlEW41pihA4Em3R_wU955vSXqzVA8=",
        set:(v)=>v===""?"https://media.istockphoto.com/id/1295744448/photo/guest-house-in-middle-of-natural-surroundings-of-coconut-tree-plantation-pollachi-tamil-nadu.webp?b=1&s=170667a&w=0&k=20&c=86IrdNp7yFVqlGwlEW41pihA4Em3R_wU955vSXqzVA8=":v
    },
    price:Number,
    location:String,
    country:String
})

let Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;