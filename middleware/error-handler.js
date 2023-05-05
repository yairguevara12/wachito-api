///look information about the middleware
const customError = require('../errors/custom-error');
const {statusCode } = require('http-status-codes');

const errorHandlerMiddleware =  (err, req, res, next) => {
    if(err instanceof customError){
     return    res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send('something went wrong');;
    
}
module.exports = errorHandlerMiddleware;
