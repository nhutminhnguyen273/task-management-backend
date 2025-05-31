const router = require('express').Router();
const roleRoutes = require('./role-routes');

router.use('/api/roles', roleRoutes);

module.exports = router;