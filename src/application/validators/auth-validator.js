const { body } = require('express-validator');
const AppError = require('../../infrastructure/errors/app-error');
const UserRepository = require('../../domain/repositories/user-repository');
const genderEnum = require('../../domain/enums/gender-enum');
const moment = require('moment');

class AuthValidator {
    validateRegister = [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isString().withMessage('Username must be a string')
            .custom(async (value) => {
                const existingUsername = await UserRepository.findOne({ username: value });
                if (existingUsername)
                    throw new AppError('Username already exists', 400);
                return true;
            }),

        body('firstName')
            .trim()
            .notEmpty().withMessage('First name is required')
            .isString().withMessage('First name must be a string'),

        body('lastName')
            .trim()
            .notEmpty().withMessage('Last name is required')
            .isString().withMessage('Last name must be a string'),

        body('dateOfBirth')
            .notEmpty().withMessage('Date of birth is required')
            .custom((value) => {
                const date = moment(value, 'DD/MM/YYYY', true);

                if (!date.isValid())
                    throw new AppError('Invalid data format. Use DD/MM/YYYY');

                if (date.isAfter(moment()))
                    throw new AppError('Date of birth cannot be in the future');

                return true;
            }),

        body('gender')
            .trim()
            .notEmpty().withMessage('Gender is required')
            .isString().withMessage('Gender must be a string')
            .custom((value) => {
                const allowedGender = Object.values(genderEnum);
                if (!allowedGender.includes(value.toLowerCase()))
                    throw new AppError(`Gender must be one of: ${allowedGender.join(', ')}`);
                return true;
            }),

        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isString().withMessage('Email must be a string')
            .isEmail().withMessage('Invalid email')
            .custom(async (value) => {
                const existingEmail = await UserRepository.findOne({ email: value });
                if (existingEmail)
                    throw new AppError('Email already exists', 400);
                return true
            }),

        body('phoneNumber')
            .trim()
            .notEmpty().withMessage('Phone number is required')
            .isString().withMessage('Phone number must be a string')
            .matches(/^0[0-9]{9}$/).withMessage('Phone number must be 10 digits and start with 0')
            .custom(async (value) => {
                const existingPhone = await UserRepository.findOne({ phoneNumber: value });
                if (existingPhone)
                    throw new AppError('Phone number already exists', 400);
                return true;
            }),

        body('password')
            .trim()
            .notEmpty().withMessage('Password is required')
            .isString().withMessage('Password must be a string')
            .isLength({ min: 6, max: 50 }).withMessage('Password must be at least 6 characters and maximum 50 characters')
    ];

    validateLogin = [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isString().withMessage('Username must be a string'),

        body('password')
            .trim()
            .notEmpty().withMessage('Password is required')
            .isString().withMessage('Passowrd must be a string')
    ];
}

module.exports = new AuthValidator;