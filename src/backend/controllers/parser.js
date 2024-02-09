//Services
const { getFileStream } = require("../services/uploads")
const { parseStream, computeDensity } = require("./../services/parser")

//Config
const MASS_KEY = "mass"
const VOLUME_KEY = "volume"

//Methods
const getFileDetails = async (req, res) => {
  const { fileKey } = req.params
  const { requireDensity } = req.query

  if(!fileKey) return res.status(400).json({error: "File URL Not Found"})

  try {
    const fileStream = await getFileStream(fileKey)
    const parsedFile = await parseStream(fileStream)

    const responseObj = { fileName: fileKey, fileBody: parsedFile }

    if(requireDensity === "true") responseObj.computedValues = computeDensity(parsedFile, MASS_KEY, VOLUME_KEY)

    res.status(200).json(responseObj)
  } catch(err){
    res.status(500).json({ error: 'Error Fetching File' })
  }
}

module.exports = {
  getFileDetails
}