const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized: No user info'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Forbidden: You do not have access'
            });
        }

        next();
    };
};

module.exports = authorizeRole;