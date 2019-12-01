const api = require('express').Router();
const logsController = require('../Controllers/logs.js');

api.get('/:containerId', (req, res) => logsController.readLogs(req, res));

module.exports = {
  api,
};