module.exports = function (req,res,next){
    req.age = Math.floor(Math.random()*100)
    if(req.age> 70)
        return res.status(403).send({error:"you are too old"})
    next()
}