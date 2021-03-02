const exp = require("express")
const app = exp();
const path = require("path")
require("dotenv").config()

const mongoose = require("mongoose")
const userApiObj = require("./backend/APIS/user-api")
const adminApiObj=require("./backend/APIS/admin-api")
const cartApiObj=require("./backend/APIS/cart-api")
app.use(exp.static(path.join(__dirname, 'dist/vnr3meanapp')))


mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to DB")

    const port = process.env.PORT;
    app.listen(port, () => console.log(`server on port ${port}`))
});

app.use("/user", userApiObj)
app.use("/admin",adminApiObj)
app.use("/cart",cartApiObj)

app.use((req, res, next) => {
    res.send({ message: `${req.url} is invalid!` })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.send({ message: "Something went wrong", reason: err.message })
})
