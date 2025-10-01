const express = require("express")
const db = require("./models")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")

const app = express() 
app.use(express.json())
app.use(express.urlencoded())
app.use("users",userRouter)
app.use("/products",productRouter)
db.sequelize.sync().then(()=>{
    console.log("DB SYNCED");
    
})

app.listen(4002,()=>console.log("Server started on http://localhost:4002"))