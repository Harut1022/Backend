import {readFile, writeFile} from 'fs/promises'

export const getAllUsers = async () => {
    const result = await readFile("./lib/data.json",'utf-8')
    if(!result) return []
    return JSON.parse(result)

}


export const addUser = async (user) =>{
    const users = await getAllUsers()
    users.push({...user, id:Date.now()})
    await writeFile("./lib/data.json",JSON.stringify(users))

}

export const getByUserLogin= async (login) => {
    const user =  await getAllUsers()
    return user.find(user=>user.login === login )
}