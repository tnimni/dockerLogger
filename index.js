const dockerOperations = require('./dockerOperations');
const express = require('express');
const logRoutes = require('./Routers/logs');

// Express setup
const app = express();

// routes
app.use('/api/v1/logs', logRoutes.api);

// Start listen to new containers
setInterval(dockerOperations.autoLogger, 3000);

app.listen(3000, () => `started listening on port 3000`);
