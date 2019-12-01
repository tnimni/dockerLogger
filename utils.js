const getNewContainers = (oldContainers, runningContainers) => {
  const newContainers = runningContainers.filter((x) => {
    if (!oldContainers.includes(x.id))
      return x;
 });
 return newContainers;
};

module.exports = {
  getNewContainers,
};