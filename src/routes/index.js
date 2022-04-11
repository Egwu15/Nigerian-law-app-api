const authRoutes = require('../.././src/routes/auth');
const lawRoutes = require('../.././src/routes/law.route');
const objRoutes = require('../.././src/routes/obj.route');
const healthCheck = require('../.././src/routes/healthCheck.route');

const routes = [
  authRoutes,
  lawRoutes,
  objRoutes,
  healthCheck,
];
module.exports = routes;
