const storage = require('./fileSystemUtils');

const writeLog = (containerId, data) => storage.writeLog(containerId, data);
const readLog = (containerId, options) => storage.readLog(containerId, options);
const checkLogExist = (containerId) => storage.checkLogExist(containerId);

module.exports = {
  writeLog,
  readLog,
  checkLogExist,
};