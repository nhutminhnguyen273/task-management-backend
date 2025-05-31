const { body } = require('express-validator');
const AppError = require('../../infrastructure/errors/app-error')
const RoleRepository = require('../../domain/repositories/role-repository');

class RoleValidator {
    validateCreateRole = [
        body('roleName')
            .trim()
            .notEmpty().withMessage('Role name is required')
            .isString().withMessage('Role name must be a string')
            .custom(async (value) => {
                const existingRole = await RoleRepository.findOne({ roleName: value });
                if (existingRole)
                    throw new AppError('Role name already exists', 400);
                return true;
            }),

        body('description')
            .notEmpty().withMessage('Description is required')
            .isString().withMessage('Description must be a string')
    ];

    validateUpdateRole = [
        body('roleName')
            .trim()
            .optional()
            .trim()
            .isString().withMessage('Role name must be a string')
            .custom(async (value, { req }) => {
                const existingRole = await RoleRepository.findOne({ roleName: value });
                if (existingRole && existingRole._id.toString() !== req.params.id && !existingRole.isDeleted)
                    throw new AppError('Role name already exists', 400);
                return true;
            }),

        body('description')
            .optional()
            .trim()
            .isString().withMessage('Description must be a string')
    ];
}

module.exports = new RoleValidator;