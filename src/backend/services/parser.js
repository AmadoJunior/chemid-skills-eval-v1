const fastCsv = require("fast-csv")
const { Transform } = require("stream");

//Helpers
const parseValue = (str) => {
  const match = str.match(/^(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : null;
};
const isValidNumber = (n) => {
  return typeof n === 'number' && !isNaN(n);
}

//Methods
const getJSONStream = () => new Transform({
  writableObjectMode: true,
  readableObjectMode: false,
  construct(callback) {
    this.isFirstObject = true;
    callback();
  },
  transform(chunk, encoding, callback) {
    if (this.isFirstObject) {
      this.push('[' + JSON.stringify(chunk));
      this.isFirstObject = false;
    } else {
      this.push(',' + JSON.stringify(chunk));
    }
    callback();
  },
  flush(callback) {
    this.push(this.isFirstObject ? '[]' : ']');
    callback();
  }
});

const computeDensityStream = (massKey, volumeKey) => new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const mass = parseValue(chunk[massKey]);
    const volume = parseValue(chunk[volumeKey]);

    if (isValidNumber(mass) && isValidNumber(volume) && volume !== 0) {
      const density = mass / volume;
      chunk.density = density.toFixed(2);
    } else {
      chunk.density = null;
    }
    
    this.push(chunk);
    callback();
  }
});

const getParsedStream = (fileStream) => {
    return fileStream
      .pipe(fastCsv.parse({ headers: (headers) => headers.map(header => header.toLowerCase()) }))
}

module.exports = {
  getParsedStream,
  computeDensityStream,
  getJSONStream
}