const { getAllUsers } = require("../models")
const {readFile} = require("fs/promises")
const path = require("path")

//users-list
module.exports = async function(response){
    let content = await readFile(path.join(__dirname, "../views/index.html"),"utf-8")
    const users =  await getAllUsers()
    const userstext = `
        <ul>
            ${
                users.map(user=> `<li>
                    ${user.first} ${user.last}
                    </li>
                    <a href = "/delete?id=${user.id}">Delete</a>
                    `).join("")
            }

        </ul>

    `
    content = content.replace("<!-- USERS -->",userstext)

    response.end(content)

}