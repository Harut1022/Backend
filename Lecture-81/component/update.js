const {readFile,writeFile} = require('fs/promises')
const path = require("path");
const pathname = path.join(__dirname,'../',"DB","users.json")
const addUser  = async (data) => {
    // const users = readFile(pathname,'utf8')
    await writeFile(pathname,JSON.stringify(data))
    console.log("ok")
    // console.log(JSON.parse(users))
}


module.exports = {addUser}