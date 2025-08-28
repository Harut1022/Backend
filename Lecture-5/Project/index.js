const http = require("http")
const {readFile} = require("fs/promises")
const querystring = require("querystring")
const { saveUser , deleteUser } = require("./models")
const renderUsers = require("./renderers/home")
const server = http.createServer(async(req,res)=>{
const url = new URL(req.url,`http://${req.headers.host}`)
    
    if(req.method === "GET"){
        
        if(req.url ==="/"){
            // const content = await readFile("./views/index.html", "utf-8")
            // res.writeHead(200,{"content-type": 'text/html'})
            // res.end(content)

            await renderUsers(res)
        }else if(req.url === "/add"){
             const content = await readFile("./views/add.html", "utf-8")
            res.writeHead(200,{"content-type": 'text/html'})
            res.end(content)
        }else if(url.pathname ==="/delete"){
            const id = url.searchParams.get("id")
            await deleteUser(id)
            res.writeHead(302,{Location: '/' })
            res.end()
        }
    }else if(req.method ==="POST"){
        if(req.url === "/add"){
            let body = ""
            req.on("data",chunk=>body+=chunk)
            req.on("end",async ()=>{
                const requestBody = querystring.parse(body)
                
                await saveUser({...requestBody,id:Date.now()})
                res.writeHead(302,{Location: '/'})
                res.end()
            })
        }

    }
})

server.listen(4002,()=>console.log("Server started on : http://localhost:4002"))