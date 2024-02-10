const fastCsv = require("fast-csv")
const { Transform } = require("stream")

//Helpers
const isValidNumber = (n) => {
  return typeof n === 'number' && !isNaN(n)
}

//Methods
const computeDensityStream = (massKey, volumeKey) => new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const mass = parseFloat(chunk[massKey])
    const volume = parseFloat(chunk[volumeKey])

    if (isValidNumber(mass) && isValidNumber(volume) && volume !== 0) {
      const density = mass / volume
      chunk.density = density.toFixed(2)
    } else {
      chunk.density = null
    }
    
    this.push(chunk)
    callback()
  }
})

const parsingStream = () => {
    return fastCsv.parse({ headers: (headers) => headers.map(header => header.toLowerCase()) })
}

module.exports = {
  parsingStream,
  computeDensityStream
}