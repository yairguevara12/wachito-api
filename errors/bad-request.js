const customError = require('./custom-error');
const {statusCode} = require('http-status-codes');

class BadRequest extends customError{
    constructor(message){
        super(message);
        this.statusCode = statusCode.badRequest;
    }
}

module.exports = badRequest;
