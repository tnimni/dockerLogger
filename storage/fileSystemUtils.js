const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const path = require('path');

const writeLog = (fileName, data) => {
  if (fs.existsSync(fileName)) {
    fs.appendFile(fileName, data, (err) => {
      if (err) throw err;
      console.log(`appened file ${fileName}`);
    });
  } else {
    fs.writeFile(fileName, data, (err) => {
      if (err) throw err;
      console.log(`saved file ${fileName}`);
    })
  }
};

const readLog = (containerId, options) => {
  const defaults = {
    offset: 1,
    limit: 20,
  };
  const fileName = `${containerId}.log`;
  let i = 1;
  const fileLines = [];
  const actual = Object.assign(defaults, options);
  const instream = fs.createReadStream(fileName);
  const outstream = new stream();
  const rl = readline.createInterface(instream, outstream);
  const limit = parseInt(actual.limit);
  const maxLines = parseInt(actual.offset) + limit;
  const offset = parseInt(actual.offset);

  return new Promise((resolve, reject) => {
    rl.on('line', (line) => {
      if (i >= offset && i < maxLines) {
        fileLines.push(line.replace(/\0/g, '').replace(/\1/g, ''));
      }
      if (i >= offset && i >= maxLines) {
        rl.close();
        resolve(fileLines);
      }
      i = i + 1;
    });
    //this will resolve if the fromLine + interval is bigger than avilable lines in file
    rl.on('close', () => resolve(fileLines));
  });
};

const checkLogExist = async (containerId) => {
  try {
  const directoryPath = path.join(__dirname, '..');
  const fileName = `${containerId}.log`;
  const dirContent = fs.readdirSync(directoryPath);
  return dirContent.includes(fileName);
  } catch (error) {
    throw error;
  };
};

module.exports = {
  writeLog,
  readLog,
  checkLogExist,
}