const mongoose=require("mongoose")
const Product=require("./Product")
const CartSchema=new mongoose.Schema({
    username:{type:String,required:true},
    product:{type:Product.schema,required:true}
})

let Cart=mongoose.model("Cart",CartSchema)
module.exports=Cart;