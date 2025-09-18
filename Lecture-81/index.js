const express = require('express');
const { addUser } = require('./component/update');
const app = express()

const PORT = 3005;
app.set("view engine","pug")
app.set("views", "pages")
app.use(express.json());
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.end(()=>console.log("hello"))
})
app.get('/add',(req,res)=>{
    res.render('add')
})
app.post('/add', async (req,res)=>{
    console.log(req.body)
    await addUser(req.body)
    res.end("ok")
})









app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});