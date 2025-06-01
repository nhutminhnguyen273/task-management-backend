const { body } = require('express-validator');
const moment = require('moment');
const UserRepository = require('../../domain/repositories/user-repository');
const genderEnum = require('../../domain/enums/gender-enum');

class UserValidator {
    validateCreateUser = [
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
            .isLength({ min: 6, max: 50 }).withMessage('Password must be at least 6 characters and maximum 50 characters'),

        body('role')
            .trim()
            .notEmpty().withMessage('Role is required')
    ];

    validateUpdateUser = [
        body('username')
            .optional()
            .trim()
            .notEmpty().withMessage('Username cannot be empty')
            .isString().withMessage('Username must be a string')
            .custom(async (value, { req }) => {
                const existingUsername = await UserRepository.findOne({ username: value });
                if (existingUsername && existingUsername._id.toString() !== req.params.id) {
                    throw new AppError('Username already exists', 400);
                }
                return true;
            }),

        body('firstName')
            .optional()
            .trim()
            .notEmpty().withMessage('First name cannot be empty')
            .isString().withMessage('First name must be a string'),

        body('lastName')
            .optional()
            .trim()
            .notEmpty().withMessage('Last name cannot be empty')
            .isString().withMessage('Last name must be a string'),

        body('dateOfBirth')
            .optional()
            .notEmpty().withMessage('Date of birth cannot be empty')
            .custom((value) => {
                const date = moment(value, 'DD/MM/YYYY', true);
                if (!date.isValid())
                    throw new AppError('Invalid date format. Use DD/MM/YYYY');
                if (date.isAfter(moment()))
                    throw new AppError('Date of birth cannot be in the future');
                return true;
            }),

        body('gender')
            .optional()
            .trim()
            .notEmpty().withMessage('Gender cannot be empty')
            .isString().withMessage('Gender must be a string')
            .custom((value) => {
                const allowedGender = Object.values(genderEnum);
                if (!allowedGender.includes(value.toLowerCase()))
                    throw new AppError(`Gender must be one of: ${allowedGender.join(', ')}`);
                return true;
            }),

        body('email')
            .optional()
            .trim()
            .notEmpty().withMessage('Email cannot be empty')
            .isString().withMessage('Email must be a string')
            .isEmail().withMessage('Invalid email')
            .custom(async (value, { req }) => {
                const existingEmail = await UserRepository.findOne({ email: value });
                if (existingEmail && existingEmail._id.toString() !== req.params.id) {
                    throw new AppError('Email already exists', 400);
                }
                return true;
            }),

        body('phoneNumber')
            .optional()
            .trim()
            .notEmpty().withMessage('Phone number cannot be empty')
            .isString().withMessage('Phone number must be a string')
            .matches(/^0[0-9]{9}$/).withMessage('Phone number must be 10 digits and start with 0')
            .custom(async (value, { req }) => {
                const existingPhone = await UserRepository.findOne({ phoneNumber: value });
                if (existingPhone && existingPhone._id.toString() !== req.params.id) {
                    throw new AppError('Phone number already exists', 400);
                }
                return true;
            })
    ];

    validateSendPasswordResetCode = [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isString().withMessage('Email must be a string')
            .isEmail().withMessage('Invalid email')
    ];

    validateVerifyResetCode = [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isString().withMessage('Email must be a string')
            .isEmail().withMessage('Invalid email'),

        body('code')
            .trim()
            .notEmpty().withMessage('Code is required')
    ];

    validateChangePassword = [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isString().withMessage('Email must be a string')
            .isEmail().withMessage('Invalid email'),
            
        body('password')
            .trim()
            .notEmpty().withMessage('Password is required')
            .isString().withMessage('Password must be a string')
            .isLength({ min: 6, max: 50 }).withMessage('Password must be at least 6 characters and maximum 50 characters')
    ];
}

module.exports = new UserValidator;