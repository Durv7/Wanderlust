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
    initData.data=initData.data.map(( obj )=>({...obj, owner:"669269baafa869376a4a9308"} ));//replacing object with new object having owner '669269baafa869376a4a9308'.
    await Listing.insertMany(initData.data);
    console.log("DB Initialized");
};

initDB();


//autherization:  we have to reinitilized data bcz new feild owner is added.