const mongoose=require('mongoose');

const oemSchema= mongoose.Schema({
    "model":String,
    "year":Number,
    "price":Number,
    "colors":[String,String,String],
    "milege":String,
    "power":String,
    "maxspeed":String,
    "userID":String

},{
    versionKey:false
})


const OEM_Specs= mongoose.model('OEM_Specs',oemSchema);

module.exports={OEM_Specs};