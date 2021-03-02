const exp = require("express");
const adminApiObj = exp.Router();
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const Product=require("../models/Product")
adminApiObj.use(exp.json())
require("dotenv").config()





const cloudinary = require("cloudinary").v2 
const { CloudinaryStorage } = require("multer-storage-cloudinary") 
const multer = require("multer")

//coudinary configuration
cloudinary.config({
    cloud_name:'djqbwmvjg',
    api_key:'492171555336437',
    api_secret: 'OO5HtI8g0gpuIZyjR3m1jXa9-KE'
    });

//cloudinary storage configuration
const storage = new CloudinaryStorage({
     cloudinary: cloudinary, 
     params:async (req, file) => {
          return { 
              folder: 'ecommapp',
               public_id: file.fieldname + '-' + Date.now() 
            }}
        });

//multer middleware configuation
var upload = multer({ storage: storage });


//login
adminApiObj.post("/login", errorHandler(async (req, res, next) => {

    //verify username
    if (req.body.username == process.env.ADMIN_USER_NAME) {

        //verify password
     //   let isEqual = await bcryptjs.compare(req.body.password, process.env.ADMIN_PASSWORD)
        //if passwords are matched
        if (req.body.password==process.env.ADMIN_PASSWORD) {
            //create jsonwebtoken
            let signedtoken = await jwt.sign({ username: process.env.ADMIN_USER_NAME }, process.env.SECRET, { expiresIn: 600 })
            res.send({ message: "success", token: signedtoken, username: process.env.ADMIN_USER_NAME })
        }
        //if passwords are not matched
        else {
            res.send({ message: "Invalid password" })
        }
    }
    else {
        res.send({message:"Invalid username"})
    }

}))


//adding new product
adminApiObj.post("/addproduct",upload.single('photo'),errorHandler(async (req,res,next)=>{

    console.log(req.body)
    console.log(req.file.path)
    //find existing product by ID in DB
    let product=await Product.findOne({productid:req.body.productid})
    //if product is already existed
    if(product!=null){
        res.send({message:"product existed"})
    }
    else{
        //the req.body.userObj is in JSON,so convert to object 
        req.body=JSON.parse(req.body.userObj) 
        req.body.productimage=req.file.path;
        //create product object
        let newProduct=new Product({
            productid:req.body.productid,
            productname:req.body.productname,
            productprice:req.body.productprice,
            productdescription:req.body.productdescription,
            productimage:req.body.productimage
        })

        await newProduct.save()
        res.send({message:"New Product added"})
    }

}))


//get products
adminApiObj.get("/products",errorHandler(async (req,res,next)=>{
    let products=await Product.find();
    if(products.length==0){
        res.send({message:"empty"})
    }
    else{
        res.send({message:"nonempty",products:products})
    }
}))


//get product by id
adminApiObj.get("/product/:productid",errorHandler(async (req,res,next)=>{
    let product=await Product.findOne({productid:req.params.productid})
    res.send({message:"success",product:product})
}))

module.exports = adminApiObj;
