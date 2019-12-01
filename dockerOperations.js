const { Docker } = require('node-docker-api');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const logWrite = require('./storage/storage');
const utils = require('./utils');

const ListenToContainers = [];

const getRunningContainers = async () => {
   try {
      const containers = await docker.container.list();
      const containersIds = containers.filter((container) => container.data.Labels.logThis === "true");
      return containersIds;
   } catch (error) {
      console.log(`Error getting running containers ${error}`)
      throw error;
   }
};

const startLoggingContainer = async (container) => {
   try {
      const logs = await container.logs({
         follow: true,
         stdout: true,
         stderr: true,
         timestamps: true,
      });
      //get the events
      logs.on('data', info => logWrite.writeLog(`${container.id}.log`, info));
      logs.on('error', err => logWrite.writeLog(`${container.id}.log`, err));
   } catch (error) {
      console.log(`Error logging containers ${error}`)
      throw error;
   }
};

const autoLogger = async () => {
   try {
      const runningContainers = await getRunningContainers();
      const newContainers = utils.getNewContainers(ListenToContainers, runningContainers);
      if (Array.isArray(newContainers) && newContainers.length) {
         newContainers.forEach(async (container) => {
            ListenToContainers.push(container.id);
            await startLoggingContainer(container);
         });
      }
      console.log("scanned for new containers");
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   autoLogger,
};