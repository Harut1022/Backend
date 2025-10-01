const express = require("express")
const app = express()
const authRouter= require("./routes/auth")
const db = require("./models")
const { User } = require("./models"); 
const {UsersVerify} = require("./models");


app.use(express.json())
app.use(express.urlencoded())
app.use("/auth", authRouter)

app.get("/verify/:key",(req,res)=>{
    const {key} = req.params 
    const user = UsersVerify.findOne({where:{verify_key:key}})
    if(!user) res.status(401).send({ error: "Invalid credentials" });
    
    UsersVerify.update(
        {verified: 1},
        {where:{verify_key:key}}
    )
    res.redirect("/user")
  
  
})

db.sequelize.sync({alter:true}).then(()=>{
    console.log("db sync")
})
app.listen(4002,() => console.log("http://localhost:4002"))