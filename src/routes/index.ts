const authRoutes = require('./auth');
const lawRoutes = require('./law.route');
const objRoutes = require('./obj.route');
const healthCheck = require('./healthCheck.route');

const routes = [
  authRoutes,
  lawRoutes,
  objRoutes,
  healthCheck,
];
export default routes;
