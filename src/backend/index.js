const express = require('express')
const env = require('dotenv')
const path = require('path')

//Init
env.config({path: path.join(__dirname, '..', '..', '.env')})
const app = express()

//Middleware
app.use(express.json())

//Routes
const upload = require("./routes/upload.js");
app.use("/api/upload", upload)

app.get("/", (req, res) => {
	res.status(200).send("OK")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('-----------------------------------')
	console.log(`SERVER STARTED AND LISTENING ON PORT ${PORT}`)
})