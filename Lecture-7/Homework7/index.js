const express = require("express")
const path = require("path")
const {getAllUsers,saveUser} = require("./server/users")
const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views','pages')
app.use(express.static(path.join(__dirname, "style")));


app.get('/',async (req,res)  => {
    const users = await getAllUsers()
    res.render('home', {users})
})

app.get('/add',(req,res)=>{
    res.render('add')
})

app.post('/users',async (req,res)=>{
    await saveUser(req.body)
    res.redirect('/')
    res.end()
})

app.listen("4005",console.log("http://localhost:4005/"))