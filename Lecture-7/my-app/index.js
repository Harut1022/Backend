const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.set("view engine","ejs")
app.set("views","pages")

app.get("/",(req,res)=>{
    const users = ["Ashot","Tiko","Hasmik","Vanuhi"]
    res.render("home",{users})
})

app.get("/add",(req,res)=>{

    res.render("add",)
})
app.get("/users",(req,res)=>{

    res.render("list",)
})
app.post("/add",(req,res)=>{
   console.log( req.body) 
   res.redirect("/users")
})









app.listen(4002,()=>console.log("http://localhost:4002"))