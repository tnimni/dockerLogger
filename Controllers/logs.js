const storage = require('../storage/storage');

const readLogs = async (req, res) => {
  try {
    const containerId = req.params.containerId;
    const options = req.query;
    //get the lines
    const logExists = await storage.checkLogExist(containerId);
    if (logExists) {
      const log = await storage.readLog(containerId, options);
      res.json(log);
    } else {
      res.status(422);
      res.json({ message: 'Unable to read log' });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'Unable to retrive log' });
  }
};

module.exports = {
  readLogs,
};
