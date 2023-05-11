/* const mysql = require('mysql'); */
/* const config = { */
/*   host: 'localhost', */
/*   port: 3306, */
/*   user: 'root', */
/*   password: 'yourpassword', */
/*   database: 'yourdatabase' */
/* }; */
/*  */
/* module.exports = mysql.createConnection(config); */


const mysql = require("promise-mysql2");
require('dotenv').config();

const databaseConfig = {
  connectionLimit: parseInt(process.env.POOL_CONNECTION_LIMIT) || 10,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PWD || '',
  database: process.env.MYSQL_DATABASE || 'wachitodb',
  port: process.env.MYSQL_PORT || '3306',
  charset: 'utf8mb4',
  timezone: 'local',
  waitForConnections: process.env.WAIT_CONNECTIONS || true,
  multipleStatements: process.env.MULTIPLE_STATEMENT || true,
  connectTimeout: parseInt(process.env.MYSQL_CONNECT_TIMEOUT) || 60 * 60 * 1000,
  acquireTimeout: parseInt(process.env.MYSQL_ACQUIRE_TIMEOUT) || 60 * 60 * 1000,
  timeout: parseInt(process.env.MYSQL_TIMEOUT) || 60 * 60 * 1000,
  supportBigNumbers: true,
};

const pool = mysql.createPool(databaseConfig);

pool.getConnection()
  .then(conn => {
    console.log(`[MYSQL-CONN] Database connected!`);
    console.log(`[MYSQL-INFO] POOL-CONNECTION-LIMIT : ${databaseConfig.connectionLimit}`);
    console.log(`[MYSQL-INFO] CONNECT-TIMEOUT : ${databaseConfig.connectTimeout} ms`);
    console.log(`[MYSQL-INFO] ACQUIRE-TIMEOUT : ${databaseConfig.acquireTimeout} ms`);
    console.log(`[MYSQL-INFO] TIMEOUT : ${databaseConfig.timeout} ms`);
    console.log(`[MYSQL-INFO] WAIT_CONNECTIONS : ${(databaseConfig.waitForConnections) ? 'Activado' : 'Desactivado'}`);
    console.log(`[MYSQL-INFO] MULTIPLE_STATEMENT : ${(databaseConfig.multipleStatements) ? 'Activado' : 'Desactivado'}`);
    conn.release();
  })
  .catch(e => {
    console.log(`[DB-CONN-ERROR] ${e.message}`);
    console.log(`[MYSQL-INFO] POOL-CONNECTION-LIMIT : ${databaseConfig.connectionLimit}`);
    console.log(`[MYSQL-INFO] CONNECT-TIMEOUT : ${databaseConfig.connectTimeout} ms`);
    console.log(`[MYSQL-INFO] ACQUIRE-TIMEOUT : ${databaseConfig.acquireTimeout} ms`);
    console.log(`[MYSQL-INFO] TIMEOUT : ${databaseConfig.timeout} ms`);
    console.log(`[MYSQL-INFO] WAIT_CONNECTIONS : ${(databaseConfig.waitForConnections) ? 'Activado' : 'Desactivado'}`);
    console.log(`[MYSQL-INFO] MULTIPLE_STATEMENT : ${(databaseConfig.multipleStatements) ? 'Activado' : 'Desactivado'}`);
  });

module.exports = pool;
