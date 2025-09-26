import express from 'express'
import cors from 'cors'
import { addUser, getByUserLogin } from './lib/db.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { authMiddleware } from './middlewares/auth.js'
const app = express()
dotenv.config()
// app.use(cors())
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


app.post('/auth/login',async (req,res)=>{
        const {login,password} = req.body 
        if(!login || !password) return res.status(400).send({message:'please provide credentials'})
        
        const found = await getByUserLogin(login)
        if(!found) return res.status(404).send({message:'Sxal tvyalner'})
        const isCorrect = await bcrypt.compare(password,found.password)
        if(!isCorrect) return res.status(404).send({message:'sxal tvyalner'})
        

        const token = jwt.sign({id:found.id},process.env.JWT_SECRET,{expiresIn:'25m'})
        
        res.status(200).send({token})
})
//PROTECTED ROUTE
app.get('/auth/user',authMiddleware,async (req,res)=>{
        const {id,name,surname} = req.user
        res.status(200).send({user: {id,name,surname}})
})
app.listen(4002,()=>console.log("http://localhost:4002")) 