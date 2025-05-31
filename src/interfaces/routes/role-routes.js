const router = require('express').Router();
const authenticateToken = require('../../infrastructure/middlewares/auth-middleware');
const authorizeRole = require('../../infrastructure/middlewares/authorize-role-middleware');
const RoleValidator = require('../../application/validators/role-validator');
const validate = require('../../infrastructure/middlewares/validate');
const RoleController = require('../controllers/role-controller');

router.get('/', authenticateToken, authorizeRole(['admin']), RoleController.findAllRoles);
router.get('/:id', authenticateToken, authorizeRole(['admin']), RoleController.findRoleById);
router.post('/', authenticateToken, authorizeRole(['admin']), RoleValidator.validateCreateRole, validate, RoleController.createRole);
router.put('/:id', authenticateToken, authorizeRole(['admin']), RoleValidator.validateUpdateRole, validate, RoleController.updateRole);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), RoleController.softDeleteRole);
router.patch('/:id', authenticateToken, authorizeRole(['admin']), RoleController.restoreRole);

module.exports = router;
