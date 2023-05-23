const Database = require("./databaseModel");

class User extends Database{
    constructor(service) {
        super(service);
    }


    async getTest(params,limit = -1) {
        try {
          let sql = `SELECT * FROM users `;
         /*  if(limit > -1){
            sql = sql + ' LIMIT ' + limit;
          } */
          let data = await this.simpleselect(sql, params);
          return data;
        } catch (error) {
          throw new Error(error);
        }
      }
    async registerUser(params) {
      try {
        let sql = `INSERT INTO users (username, password, email , hashed_password) VALUES
        (?, ?, ?, ?) `;
        let data = await this.insert(sql, params);
        console.log("registeringUser--->" + data);
      } catch (error) {
        
      }
    }
}

module.exports = User ;