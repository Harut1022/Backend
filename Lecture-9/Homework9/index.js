import express from 'express'
import cors from 'cors'
import { addUser, getByUserLogin } from './lib/db.js'
import bcrypt from 'bcrypt'
import path from 'path'
import { fileURLToPath } from "url";
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.set('view engine','pug')
app.set('views','client')
app.use(express.static(path.join(__dirname,'client', "style")));
app.get('/',(req,res)=>{
        res.render('login')

})
app.get('/signup',(req,res)=>{
        res.render('signup')
})


app.post('/signup/users',async(req,res)=>{
        const user = req.body 
        const found = await getByUserLogin(user.login)
        if(found) return res.status(400).send({message:"Login is busy!"})
        
        user.password = await bcrypt.hash(user.password,10)
        await addUser(user) 
        res.redirect('/')
        res.status(201).send({message:"Succesfuly"})

})

app.post('/login/users',async (req,res)=>{
        
        const {login,password} = req.body 
        if(!login || !password) res.status(404).send({message:"sxal tvyalner"})
        const found = await getByUserLogin(login)
        
        if(!found) return res.status(404).send({message:"sxal tvyalner"})
        const isCorrect = await bcrypt.compare(password,found.password)

        if(!isCorrect) return res.status(404).send({message:"sxal tvyalner"})


        res.status(200).render('welcome',{name:found.name})
})
app.listen(4002,()=>console.log("http://localhost:4002")) 