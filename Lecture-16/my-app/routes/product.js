const express = require("express")
const router = express.Router()
const {Product } = require("../models")
router.post("/",async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Missing Fields"})

    }

    const {name,price,quantity=1,userId} = req.body
    const product = await Product.create({name,price,quantity,userId})
    return res.status(201).send({message:"Success",product})
})

router.delete("/:id",async(req,res)=>{
    const {id} = req.params
    await Product.destroy({where:{id}})
    res.send({message:"success"})
})
module.exports = router