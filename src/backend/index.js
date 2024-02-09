const express = require('express')
const env = require('dotenv')
const path = require('path')

//Init
env.config({path: path.join(__dirname, '..', '..', '.env')})
const app = express()

//Middleware
app.use(express.json())

//Routes
const uploadsRouter = require("./routes/uploads.js");
app.use("/api/uploads", uploadsRouter)
const parserRouter = require("./routes/parser.js");
app.use("/api/parser", parserRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('-----------------------------------')
	console.log(`SERVER STARTED AND LISTENING ON PORT ${PORT}`)
})