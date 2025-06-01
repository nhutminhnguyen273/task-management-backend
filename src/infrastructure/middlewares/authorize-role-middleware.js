const authorizeRole = (roles = [], allowSelf = false) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized: No user info'
            });
        }

        const hasRole = roles.includes(req.user.role);
        const isSelf = allowSelf && req.user.userId.toString() === req.params.id;

        if (!hasRole && !isSelf) {
            return res.status(403).json({
                message: 'Forbidden: You do not have access'
            });
        }

        next();
    };
};

module.exports = authorizeRole;