const express = require("express")
const middleware = require("./middleware")
const app = express()
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
app.set("view engine","ejs")
app.set("views","views")
app.use("/users",userRoutes)
app.use("/products",productRoutes)
app.use(middleware)


app.get("/",(req,res)=>{
    console.log(req.age)
   res.end("hello")
    // res.render("home")
})










app.listen(4002,()=>{
    console.log("http://localhost:4002/")
})