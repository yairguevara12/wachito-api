'use strict'

const Auth = require("./database/auth");
const User = require("./database/user");


module.exports = {
    auth( service ){  return new Auth(service); } , 
    user( service ){  return new User(service); }
}
