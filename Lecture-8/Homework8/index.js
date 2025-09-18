const express = require("express")
const app = express()
app.set ("view engine" , "pug")
app.set ("views", "views")

app.get("/",(req,res)=>{
    res.render("home")
})












app.listen(4002,()=>{
    console.log("http://localhost:4002/")
})