const express = require("express")
const controller = require("../controllers/userController")
const router = express.Router()

router.get("/find/:id", controller.find.bind(controller))

module.exports = router