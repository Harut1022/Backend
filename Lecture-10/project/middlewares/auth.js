import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { getUser } from '../lib/db.js'

dotenv.config()

export const authMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).send({message:"please provide a token "})
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token ,process.env.JWT_SECRET,async (err,data)=>{
        if(err) return res.status(403).send({message:"Invalid of expired token"})

        req.user = await getUser(user=>user.id == data.id) 
        next()
    })

}   