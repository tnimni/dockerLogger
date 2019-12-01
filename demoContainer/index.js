let timerId = setInterval(() => console.log("this is a log record " + Date.now()), 1000);

let time = Date.now();

setTimeout(() => {
  clearInterval(timerId);
}, process.env.CLEAR_INTERVAL_TIME * 1000 * 60);