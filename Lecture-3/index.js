// const path = require("path")
// console.log(path.join("A","../B","C"));
// console.log(path.resolve("A","B","C"))


// const fs = require("fs")

// fs.writeFile("data.txt","Hello bbbb",function(err){
//     if(err) throw err 
//     console.log("done")
// })

// fs.readFile("data.txt","utf-8",(err,data)=>{
//     if(err) throw err
//     console.log(data)
// })


// const {readFile} = require("fs/promises")

// ;(async()=>{
//     const result = await readFile("data.txt","utf-8")
//     console.log(result);
    
// })()

//fs.readdir("./test",{})
//Process.argv


const http = require("http")
const {readFile} = require ("fs/promises")
// const server = http.createServer(function(req,res){
//     // res.writeHead(200,{'content-type':'application/json'})
//     // res.write("<h1>hello</h1>")
//     // res.write("<p>good bye</p>")
//     console.log(req.url)
//     console.log(req.method)
//     res.end("<p>Thank you </p>")

// })

const server = http.createServer(async(req,res)=>{
    const content = await readFile("./views/index.sq","utf-8")
    res.end(content)
})





server.listen(4002,()=>console.log("server started on http://localhost:4002"))