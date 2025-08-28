const path = require("path")
const {readFile,writeFile} = require("fs/promises")
const { get } = require("http")

const pathname = path.resolve(__dirname+"/db.json")

const getAllUsers = async ()=>{
    const users = await readFile(pathname,"utf-8")
    if(!users) return [] 
    return JSON.parse(users)
}
const saveUser = async (data)=>{
    const users = await getAllUsers()
    users.push(data)
    await writeFile(pathname,JSON.stringify(users))

}
const deleteUser = async(id) =>{
    const users = await getAllUsers()
    
    let filtered = users.filter(user => user.id != id)
  
    await writeFile(pathname, JSON.stringify(filtered))

}


module.exports =  {getAllUsers,saveUser,deleteUser}