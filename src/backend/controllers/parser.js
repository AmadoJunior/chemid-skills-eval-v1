//Services
const { getFileStream } = require("../services/uploads")
const { getParsedStream, computeDensityStream, getJSONStream } = require("./../services/parser")

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

    let parsedStream = getParsedStream(fileStream)
    if (requireDensity === 'true') {
      const myComputeDensityStream = computeDensityStream(MASS_KEY, VOLUME_KEY)
      parsedStream = parsedStream.pipe(myComputeDensityStream)
    }
    
    res.setHeader('Content-Type', 'application/json');

    const myJSONStream = getJSONStream()
    parsedStream
      .pipe(myJSONStream)
      .pipe(res)
      .on('error', (error) => {
        console.error('Stream Error:', error);
      });
  } catch(err){
    res.status(500).json({ error: 'Error Fetching File' })
  }
}

module.exports = {
  getFileDetails
}