const exp = require("express")
const cartApiObj = exp.Router();
const errorHandler = require("express-async-handler")
const Cart = require("../models/Cart");
const Product = require("../models/Product");
cartApiObj.use(exp.json())

cartApiObj.post("/add", errorHandler(async (req, res, next) => {

    //console.log("body is ", req.body)

    //search whether this item is already added or not
    let product = await Cart.findOne({ "product.productid": req.body.product.productid ,username:req.body.username})
    
    if (product != null) {
        let userCart = await Cart.find({ username:req.body.username});
        console.log("usercart ",userCart)
        res.send({ message: "Product already added to your cart", cartsize: userCart.length })
    }

    else {
        let cartItem = new Cart({
            username: req.body.username,
            product: req.body.product
        })

        await cartItem.save()

        let userCart = await Cart.find({  username:req.body.username});


        res.send({ message: "Product added to cart succuessfully", cartsize: userCart.length })
    }
}))

//get cart size by username
cartApiObj.get("/getsize/:username", errorHandler(async (req, res, next) => {

    let userCart = await Cart.find({ username: req.params.username })
    let userCartSize = userCart.length;
    res.send({ cartsize: userCartSize, userCart: userCart })

}))
module.exports = cartApiObj;