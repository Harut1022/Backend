const express = require("express")
const { Sequelize } = require("sequelize")
const router = express.Router()
const {User} = require("../models")
router.post('/',async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Misising Fields"})
    }

    const {name,surname,age,salary} = req.body
    //validations
    const user = await User.create({name,surname,age,salary})
    res.status(201).send({message:"Successfully added",user},)
})

router.get("/:id",async (req,res)=>{
    const {id } = req.params
    const found = await User.findByPk(id)
    res.send({user:found})
})
module.exports = router