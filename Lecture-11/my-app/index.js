
import express from "express"
import pool from './db/config.js'
import { userModel } from "/models/users.js"
const app = express()

app.get("/users",async (req,res)=>{
    const users = await userModel.findAll()
    res.send(users)
})

app.listen(4002,()=>console.log("http://localhost:4002"))