import pool from '../db/config.js'
export class BaseModel {
    table = null
    async findAll(){
        const command = `SELECT * FROM ${this.table}`
        const [rows] = await pool.query(command)
        return rows 
    }
    async findWhere (props){
        const keys = Object.keys(props)
        const values = Object.values(props)

        let command = `SELECT * FROM ${this.table}
        WHERE `
        for(let key in props){
            command += `${key} = ${props[key]} and `
        }
        const [rows] = await pool.query(command.slice(0,-4))
        return rows 
    }
}