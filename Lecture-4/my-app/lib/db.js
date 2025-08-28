const {readFile,writeFile} = require("fs/promises")

async function readAll(path){
    const content = await readFile(path, "utf-8")
    if(!content) return [] 
    return JSON.parse(content)
}

async function save(user,path){
    const users = await readAll(path)
    users.push(user)
    await writeFile(path,JSON.stringify(users))
}


module.exports = {readAll, save};