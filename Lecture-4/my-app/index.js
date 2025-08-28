
const http = require("http")
const {readFile} = require("fs/promises")
const queryParser = require("querystring")
const {save, readAll} = require("./lib/db.js");
const server = http.createServer(async function(req,res){
    if(req.url ==="/" && req.method ==="GET"){
        res.writeHead(200,{'content-type':'text/html'})
        let content = await readFile("./views/home.html", "utf-8");
        const users = await readAll("./lib/data.json");
        users.forEach(user => {
            content += `<p> ${user.First} ${user.Last}</p>`
        });
        res.end(content);
    }else if (req.method === "POST" && req.url === "/add"){
        let body = "";
        req.on("data", chunk => body+=chunk)
        req.on("end", async () => {
            const user = queryParser.parse(body);
            await save(user, "./lib/data.json");
            res.writeHead(302, {Location:'/'});
            res.end()
        })
    }else{
        res.end("Error")
    }
})


server.listen(4002,()=>console.log("server started on http://localhost:4002"))