///look information about the middleware
const customError = require('../errors/custom-error');
const unaunthenticated = require('../errors/unaunthenticated');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof customError) {
        console.log(err.statusCode);

        if (err instanceof unaunthenticated) {
            return res.status(err.statusCode).json({ msg: err.message  , isValid  :  false});
        }

        return res.status(err.statusCode).json({ msg: err.message });
        
    }
    console.log(StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ err: 'something went wrong' });;

}
module.exports = errorHandlerMiddleware;
