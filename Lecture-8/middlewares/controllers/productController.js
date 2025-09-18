const ProductModel = require("../models/product")
class ProductController {
    model = new ProductModel()
    find(req, res) {
        const found = this.model.getOne()
        if(!found){
            return res.status(404).send("../")
        }
        res.send("Hello from Products find")
    }
}

module.exports = new ProductController()