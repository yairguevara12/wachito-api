const Database = require("./databaseModel");

class Auth extends Database {
    constructor(service) {
        super(service);
    }


    async getUserByEmail(params, limit = -1) {
        try {
            let sql = `SELECT * FROM users where email = ?  `;
            if (limit > -1) {
                sql = sql + ' LIMIT ' + limit;
            }
            let data = await this.simpleselect(sql, params);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }



    async getHashedPassword(params, limit = -1) {
        try {
            let sql = `SELECT hashed_password FROM users where email = ?`;
            if (limit > -1) {
                sql = sql + ' LIMIT ' + limit;
            }
            let data = await this.simpleselect(sql, params);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async getUserID(params, limit = -1) {
        try {
            let sql = `SELECT id,username FROM users where hashed_password = ?`;
            if (limit > -1) {
                sql = sql + ' LIMIT ' + limit;
            }
            let data = await this.simpleselect(sql, params);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

}
module.exports = Auth;