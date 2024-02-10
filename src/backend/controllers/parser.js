//Services
const { getFileStream } = require("../services/uploads")
const { parsingStream, computeDensityStream } = require("./../services/parser")

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
    
    //Parses CSV
    let parsedStream = fileStream.pipe(parsingStream())
    if (requireDensity === 'true') {
      //Adds Density
      parsedStream = parsedStream.pipe(computeDensityStream(MASS_KEY, VOLUME_KEY))
    }
    
    // Acc Objects
    const objects = [];
    parsedStream.on('data', (obj) => {
      objects.push(obj)
    })

    parsedStream.on('error', (error) => {
      console.error('Stream Error:', error)
      res.status(500).json({ error: 'Error Processing Stream' })
    })

    parsedStream.on('end', () => {
      res.status(200).json(objects)
    })
  } catch(err){
    res.status(500).json({ error: 'Error Fetching File' })
  }
}

module.exports = {
  getFileDetails
}