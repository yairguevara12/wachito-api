const mysql = require('mysql');
const config = {
  host: 'localhost',
  port: 3306,
  user: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase'
};

module.exports = mysql.createConnection(config);