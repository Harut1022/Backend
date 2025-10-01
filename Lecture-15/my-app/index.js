import express from "express"
import { sequelize } from "./db/config.js"
import {User,Product} from "./models/index.js"
import "./lib/prototype.js"
import { Validator } from "./lib/validator.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded())
sequelize.sync().then(()=>{
    console.log("Database has been connected successfully")
})
app.get("/users",async (req,res)=>{
    const users = await User.findAll()
    res.send({users})
})
app.post("/users",async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Request Payloads is missing"})
    }
    if(!req.body.hasAllKeys("name","surname","age","salary")){
        return res.status(400).send({message:"Some Fields are missing"})
    }
  
    const {name,surname,salary,age} = req.body
    if(!Validator.isNumeric(salary)){
        return res.status(400).send({message:"sxala grvac tariqy"})
    }
    await User.create({name,surname,salary,age})
    res.status(201).send({message:"success"})
})


app.get("/users/:id",async(req,res)=>{
    const {id} = req.params
    const user = await User.findByPk(id)
    res.send(user)
})
app.listen(4005,()=>console.log("http://localhost:4005/"))