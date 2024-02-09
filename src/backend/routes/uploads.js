const express = require("express")

//Controllers
const {postFile, getFiles} = require('../controllers/uploads')

//Init Router
const uploadsRouter = express.Router()

//Register Routes
uploadsRouter.get("/", getFiles)
uploadsRouter.post("/", postFile)

module.exports = uploadsRouter