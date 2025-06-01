const router = require('express').Router();
const authenticateToken = require('../../infrastructure/middlewares/auth-middleware');
const authorizeRole = require('../../infrastructure/middlewares/authorize-role-middleware');
const UserValidator = require('../../application/validators/user-validator');
const validate = require('../../infrastructure/middlewares/validate');
const UserController = require('../controllers/user-controller');

router.get('/', authenticateToken, authorizeRole(['admin']), UserController.findAllUsers);
router.get('/deleted', authenticateToken, authorizeRole(['admin']), UserController.findAllDeletedUsers);
router.get('/:id', authenticateToken, authorizeRole(['admin'], true), UserController.findUserById);
router.post('/', authenticateToken, authorizeRole(['admin']), UserValidator.validateCreateUser, validate, UserController.createUser);
router.put('/:id', authenticateToken, authorizeRole(['admin'], true), UserValidator.validateUpdateUser, validate, UserController.updateUser);
router.delete('/:id', authenticateToken, authorizeRole(['admin'], true), UserController.softDeleteUser);
router.patch('/:id', authenticateToken, authorizeRole(['admin']), UserController.restoreUser);
router.post('/request-reset', UserValidator.validateSendPasswordResetCode, validate, UserController.sendPasswordResetCode);
router.post('/verify-code', UserValidator.validateVerifyResetCode, validate, UserController.verifyResetCode);
router.post('/change-password', UserValidator.validateChangePassword, validate, UserController.changePassword);

module.exports = router;