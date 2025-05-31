const { validationResult } = require('express-validator');

const validate = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return res.status(400).json({
            errors: extractedErrors
        });
    }
    next();
};

module.exports = validate;