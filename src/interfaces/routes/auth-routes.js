const router = require('express').Router();
const authenticateToken = require('../../infrastructure/middlewares/auth-middleware');
const AuthValidator = require('../../application/validators/auth-validator');
const validate = require('../../infrastructure/middlewares/validate');
const AuthController = require('../controllers/auth-controller');

router.post('/register', AuthValidator.validateRegister, validate, AuthController.register);
router.post('/login', AuthValidator.validateLogin, validate, AuthController.login);
router.post('/logout', authenticateToken, AuthController.logout);

module.exports = router;