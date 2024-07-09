const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main().then(res=>{
    console.log("Connected To DB");
}).catch(err=>{
    console.log(err);
})

async function main()
{
    mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}



let initDB=async ()=>{
    await Listing.deleteMany();
    await Listing.insertMany(initData.data);
    console.log("DB Initialized");
};

initDB();
