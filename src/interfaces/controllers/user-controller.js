const asyncHandler = require('../../infrastructure/middlewares/async-handler');
const UserService = require('../../application/services/user-service');

class UserController {
    findAllUsers = asyncHandler(async (req, res) => {
        const users = await UserService.findAllUsers();
        res.status(200).json({
            success: true,
            message: 'Get list of successful users',
            data: users
        });
    });

    findAllDeletedUsers = asyncHandler(async (req, res) => {
        const users = await UserService.findAllDeletedUsers();
        res.status(200).json({
            success: true,
            message: 'Get list of successful users',
            data: users
        });
    });

    findUserById = asyncHandler(async (req, res) => {
        const user = await UserService.findUserById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Found user by id',
            data: user
        });
    });

    createUser = asyncHandler(async (req, res) => {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: 'Created user successfully',
            data: newUser
        });
    });

    updateUser = asyncHandler(async (req, res) => {
        const user = await UserService.findByIdAndUpdateUser(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Updated user successfully',
            data: user
        });
    });

    softDeleteUser = asyncHandler(async (req, res) => {
        await UserService.findByIdAndSoftDeleteUser(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Deleted user successfully'
        });
    });

    restoreUser = asyncHandler(async (req, res) => {
        await UserService.findByIdAndRestoreUser(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Restored user successfully'
        });
    });

    sendPasswordResetCode = asyncHandler(async (req, res) => {
        await UserService.sendPasswordResetCode(req.body);
        res.status(200).json({
            success: true,
            message: 'Verification code send to email'
        });
    });

    verifyResetCode = asyncHandler(async (req, res) => {
        await UserService.verifyResetCode(req.body);
        res.status(200).json({
            success: true,
            message: 'Code verified successfully'
        });
    });

    changePassword = asyncHandler(async (req, res) => {
        await UserService.changePassword(req.body);
        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    });
}

module.exports = new UserController;