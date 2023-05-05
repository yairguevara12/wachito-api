const customError = require('./custom-error');
const {statusCode }= require('http-status-codes');
class Unaunthenticated extends customError{
    constructor(message){
        super(message);
        this.statusCode = statusCode.UNAUTHORIZED;
    
    }
}
module.exports = Unaunthenticated;