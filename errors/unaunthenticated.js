const customError = require('./custom-error');
const {statusCode }= require('http-status-codes');
class Unaunthenticated extends customError{
    constructor(message){
        super(message);
        this.statusCode = 403;
    
    }
}
module.exports = Unaunthenticated;