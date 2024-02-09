const express = require("express")

//Controllers
const {getFileDetails} = require("./../controllers/parser")

//Init Router
const parserRouter = express.Router()

//Register Routes
parserRouter.get("/:fileKey", getFileDetails)

module.exports = parserRouter