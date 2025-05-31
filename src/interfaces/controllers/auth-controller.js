const asyncHandler = require('../../infrastructure/middlewares/async-handler');
const AuthService = require('../../application/services/auth-service');

class AuthController {
    register = asyncHandler(async (req, res) => {
        await AuthService.register(req.body);
        res.status(200).json({
            success: true,
            message: 'Registered successfully'
        });
    });

    login = asyncHandler(async (req, res) => {
        await AuthService.login(req.body, res);
        res.status(200).json({
            success: true,
            message: "Logged successfully"
        });
    });

    logout = asyncHandler(async (req, res) => {
        await AuthService.logout(res);
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    });
}

module.exports = new AuthController;