import mysql from "mysql2/promise"
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "Kapik.102",
    database:"lesson"
})

export default pool