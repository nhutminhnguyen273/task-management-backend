const asyncHandler = require('../../infrastructure/middlewares/async-handler');
const RoleService = require('../../application/services/role-service');

class RoleController {
    findAllRoles = asyncHandler(async(req, res) => {
        const roles = await RoleService.findAllRoles();
        res.status(200).json({
            success: true,
            message: 'Get list of successful roles',
            data: roles
        });
    });

    findRoleById = asyncHandler(async(req, res) => {
        const role = await RoleService.findRoleById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Found role by id successfully',
            data: role
        });
    });

    createRole = asyncHandler(async(req, res) => {
        const newRole = await RoleService.createRole(req.body);
        res.status(201).json({
            success: true,
            message: 'Created role successfully',
            data: newRole
        });
    });

    updateRole = asyncHandler(async(req, res) => {
        const role = await RoleService.findByIdAndUpdateRole(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Updated role successfully',
            data: role
        });
    });

    softDeleteRole = asyncHandler(async(req, res) => {
        await RoleService.findByIdAndSoftDeleteRole(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Deleted role successfully'
        });
    });

    restoreRole = asyncHandler(async(req, res) => {
        await RoleService.findByIdAndRestoreRole(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Restored role successfully'
        });
    });
}

module.exports = new RoleController;