const AppError = require('../../infrastructure/errors/app-error');
const UserRepository = require('../../domain/repositories/user-repository');
const RoleRepository = require('../../domain/repositories/role-repository');
const CreateUserDTO = require('../dtos/users/create-user-dto');
const UpdateUserDTO = require('../dtos/users/update-user-dto');
const ChangePasswordDTO = require('../dtos/users/change-password-dto');
const UserDTO = require('../dtos/users/user-dto');
const EmailDTO = require('../dtos/users/email-dto');
const VerifyResetCodeDTO = require('../dtos/users/verify-reset-code-dto');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const PasswordResetToken = require('../../domain/models/password-reset-token');
const EmailService = require('./email-service');

class UserService {
    async findAllUsers() {
        const users = await UserRepository.findAll({ isDeleted: false });
        const userDTOs = users.map(user => new UserDTO(user));
        return userDTOs;
    }

    async findAllDeletedUsers() {
        const users = await UserRepository.findAll({ isDeleted: true });
        const userDTOs = users.map(user => new UserDTO(user));
        return userDTOs;
    }

    async findUserById(id) {
        const user = await this.findUserOrThrow(id);
        return new UserDTO(user);
    }

    async createUser(userData) {
        const userDTO = new CreateUserDTO(userData);
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        const userRole = await RoleRepository.findOne({ roleName: userDTO.role });
        const newUser = {
            ...userDTO,
            password: hashedPassword,
            role: userRole
        }
        const saved = await UserRepository.create(newUser);
        return new UserDTO(saved);
    }

    async findByIdAndUpdateUser(id, userData) {
        await this.findUserOrThrow(id);
        const userDTO = new UpdateUserDTO(userData);
        const user = await UserRepository.findByIdAndUpdate(id, userDTO);
        return new UserDTO(user);
    }

    async findByIdAndSoftDeleteUser(id) {
        await this.findUserOrThrow(id);
        return await UserRepository.findByIdAndSoftDelete(id);
    }

    async findByIdAndRestoreUser(id) {
        await this.findUserOrThrow(id);
        return await UserRepository.findByIdAndRestore(id);
    }

    async sendPasswordResetCode(email) {
        const emailDTO = new EmailDTO(email);
        const code = crypto.randomInt(100000, 999999).toString(); // code có 6 số
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 phút

        await PasswordResetToken.findOneAndUpdate(
            { email: emailDTO.email },
            { token: code, expiresAt },
            { upsert: true, new: true }
        );

        return await EmailService.sendVerificationCode(emailDTO.email, code);
    }

    async verifyResetCode(email, code) {
        const verifyResetCodeDTO = new VerifyResetCodeDTO(email, code);
        const record = await PasswordResetToken.findOne({ email: verifyResetCodeDTO.email, token: verifyResetCodeDTO.code });
        if (!record)
            throw new AppError('Invalid or expired code', 400);

        if (record.expiresAt < new Date())
            throw new AppError('Verification code has expired', 400);
        return true;
    }

    async changePassword(email, newPassword) {
        const changePasswordDTO = new ChangePasswordDTO(email, newPassword);
        const user = await UserRepository.findOne({ email: changePasswordDTO.email });
        if (!user)
            throw new AppError('User not found!', 404);
        const hashedPassword = await bcrypt.hash(changePasswordDTO.password, 10);
        user.password = hashedPassword;
        await user.save();

        return await PasswordResetToken.deleteOne({ email: changePasswordDTO.email });
    }

    async findUserOrThrow(id) {
        const user = await UserRepository.findById(id);
        if (!user)
            throw new AppError('User not found!', 404);
        return user;
    }
}

module.exports = new UserService;