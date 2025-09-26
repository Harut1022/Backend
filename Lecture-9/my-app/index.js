import express from 'express'
import cors from 'cors'
import { addUser, getByUserLogin } from './lib/db.js'
import bcrypt from 'bcrypt'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.post('/auth/signup',async(req,res)=>{
        const user = req.body 
        const found = await getByUserLogin(user.login)
        if(found) return res.status(400).send({message:"Login is busy!"})
        
        user.password = await bcrypt.hash(user.password,10)
        await addUser(user) 
        res.status(201).send({message:"Succesfuly"})
})

app.listen(4002,()=>console.log("http://localhost:4002")) 