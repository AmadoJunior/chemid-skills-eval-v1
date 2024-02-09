const multer = require('multer')

//Services
const {uploadFile, listObjects} = require("../services/uploads")

//Controllers
const postFile = (req, res) => {
  const uploadSingleCSV = uploadFile.single('file')

  uploadSingleCSV(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer Error
      return res.status(400).send({ error: err.message })
    } else if (err) {
      // Unknown Error
      return res.status(500).send({ error: err.message })
    }

    if(!req.file) return res.status(400).json({error: "No File Uploaded"})

    res.status(200).json({
      fileName: req.file.originalname,
      fileUrl: req.file.location
    }).send()
  })
}

const getFiles = async (req, res) => {
  try {
    const files = await listObjects()

    res.status(200).json(files)
  } catch (error) {
    res.status(404).json({ error: 'Error Fetching Files' })
  }
}

module.exports = {
  postFile,
  getFiles
};