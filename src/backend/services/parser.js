const fastCsv = require("fast-csv")

//Helpers
const parseValue = (str) => {
  const match = str.match(/^(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : null;
};
const isValidNumber = (n) => {
  return typeof n === 'number' && !isNaN(n);
}

//Methods
const parseStream = (fileStream) => {
  return new Promise((resolve, reject) => {
    let csvData = [];
    fileStream.pipe(fastCsv.parse({ headers: (headers) => headers.map(header => header.toLowerCase()) }))
    .on('error', (error) => reject(error))
    .on('data', (row) => csvData.push(row))
    .on('end', () => {
      resolve(csvData)
    })
  })
}

const computeDensity = (parsedObject, massKey, volumeKey) => {
  return parsedObject.map((obj) => {
    const mass = parseValue(obj[massKey])
    const volume = parseValue(obj[volumeKey])
    if (isValidNumber(mass) && isValidNumber(volume) && volume !== 0) {
      const density = mass / volume;
      return { compound: obj.compound, density: density.toFixed(2) };
    } else {
      return { compound: obj.compound, density: null };
    }
  })
}

module.exports = {
  parseStream,
  computeDensity
}