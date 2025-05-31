const jwt = require('jsonwebtoken');
const UserRepository = require('../../domain/repositories/user-repository');

const generateToken = async function(res, user) {
    const fullUser = await UserRepository.findByIdAndRole(user._id);
    const roleName = fullUser.role.roleName;
    const token = jwt.sign(
        {
            userId: user._id,
            role: roleName
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.cookie('token', token, {
        httpOnly: true, // cookie không thể tuy cập bằng JS
        secure: false, // true nếu dùng HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 ngày
        sameSite: 'strict'
    });
};

module.exports = generateToken;