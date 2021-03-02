const mongoose=require("mongoose")
const ProductSchema=new mongoose.Schema({
    productid:{
        type:Number,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    productprice:{
        type:Number,
        required:true
    },
    productdescription:{
        type:String,
        required:true
    },
    productimage:{
        type:String,
        required:true
    }
})

const Product=mongoose.model("product",ProductSchema)
module.exports=Product;