const jwt = require('jsonwebtoken')
const Unaunthenticated = require("../errors/unaunthenticated");

const authenticationMiddleware = async (req, res, next) => {
    console.log('AUTHENTICATING');
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unaunthenticated('No token provided')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'], // Specify the expected algorithm
            ignoreExpiration: false // Enable expiration validation
        });

        const { id, username, exp } = decoded;
        req.user = { id, username };

        if (Date.now() >= exp * 1000) {
            throw new Unaunthenticated('Token has expired');
        }

        // Additional payload validation
        if (!id || !username) {
            throw new Unaunthenticated('Invalid token payload');
        }

        next();
    } catch (error) {
        throw new Unaunthenticated('Not authorized to access this route');
    }
}

module.exports = authenticationMiddleware
