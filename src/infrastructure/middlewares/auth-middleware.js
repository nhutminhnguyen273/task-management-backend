const jwt = require('jsonwebtoken');

const authenticateToken = function(req, res, next) {
    const token = req.cookies.token;

    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;