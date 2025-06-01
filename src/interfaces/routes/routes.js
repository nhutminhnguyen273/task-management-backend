const router = require('express').Router();
const roleRoutes = require('./role-routes');
const authRoutes = require('./auth-routes');
const userRoutes = require('./user-routes');

router.use('/api/roles', roleRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);

module.exports = router;