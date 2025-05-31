const jwt = require('jsonwebtoken');

const generateToken = function(res, user) {
    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.cookie('token', token, {
        httpOnly: true, // cookie không thể tuy cập bằng JS
        secure: false, // true nếu dùng HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 ngày
    });
};

module.exports = generateToken;