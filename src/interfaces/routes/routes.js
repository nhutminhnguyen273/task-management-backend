const router = require('express').Router();
const roleRoutes = require('./role-routes');
const authRoutes = require('./auth-routes');

router.use('/api/roles', roleRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;