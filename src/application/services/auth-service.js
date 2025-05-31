const AppError = require('../../infrastructure/errors/app-error');
const UserRepository = require('../../domain/repositories/user-repository');
const RoleRepository = require('../../domain/repositories/role-repository');
const RegisterDTO = require('../dtos/auth/register-dto');
const LoginDTO = require('../dtos/auth/login-dto');
const bcrypt = require('bcrypt');
const generateToken = require('../../infrastructure/jwt/jwt');

class AuthService {
    async register(userData) {
        const userDTO = new RegisterDTO(userData);
        const userRole = await RoleRepository.findOne({roleName: 'user'});
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        const newUser = {
            ...userDTO,
            password: hashedPassword,
            role: userRole._id
        };
        return await UserRepository.create(newUser);
    }

    async login(userData, res) {
        const userDTO = new LoginDTO(userData);
        const existingUser = await UserRepository.findOne({username: userDTO.username});
        if (!existingUser)
            throw new AppError('Username is incorrect', 400);
        if (existingUser.isDeleted)
            throw new AppError('Account has been deleted', 403);
        const isPasswordValid = await bcrypt.compare(userDTO.password, existingUser.password);
        if (!isPasswordValid)
            throw new AppError('Password is incorrect', 400);
        return generateToken(res, existingUser);
    }

    logout(res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })
    }
}

module.exports = new AuthService;