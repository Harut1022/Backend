const {readFile, writeFile} = require('fs/promises')
const { v4: uuidv4 } = require("uuid");
const path = require('path')
const getAllUsers =async () => {
    const users = await readFile(path.join(__dirname,'../','DB','users.json'),'utf-8')
    return JSON.parse(users)
}
const genId = () => {
    const id = uuidv4()
    return id 

}
const saveUser = async (data) =>{
    const users = await getAllUsers()
    users.push({...data, id:users[users.length-1].id+1})
    console.log(users)
    writeFile(path.join(__dirname,'../','DB','users.json'),JSON.stringify(users))

}


module.exports = {getAllUsers,saveUser}