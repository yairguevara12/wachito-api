class Database {
    constructor(service) {
        this._initialized = false;
        this._connection = null;
        if (service != undefined || service != null) {
            //console.log.debug( JSON.stringify(service) );
            if (service.currentConnection() != null) {
                this._initialized = true;
                this.connection = service.currentConnection();

                console.log('main SERVICE' + " initialized with service");
            } else {
                console.log('main SERVICE' + " contains a service " + 'main SERVICE' + " with no connections");
            }
        }
    }
    set initialized(initialized) { this._initialized = initialized; }
    get initialized() { return this._initialized; }

    set connection(connection) { this._connection = connection; }
    get connection() { return this._connection; }


    async createConnection() {
        if (this.initialized && this.connection != null) {
            return this.connection;
        } else {
            console.log("[MODEL] this object model " + this.modelName + " manages its connection db");
            this.connection = await pool.getConnection();
        }
        return this.connection;
    }
    async release() {
        //if the connection has not initialized by a service, then relaese it 
        if (!this.initialized && this.connection != null) {
            console.log("[MODEL] release own connection");

            this.connection.release();
            this.connection = null;
        } else {
            console.log("this connection should be released with a service");
        }
    }
    simpleselect(sql, params) {
        return new Promise(async (resolve, reject) => {
            let conn;
            try {
                conn = await this.createConnection();
                console.log("[select statement] => " + sql.replace(/\r/g, "").replace(/\n/g, "").replace(/  +/g, ' '))
                console.log("[select params   ] => " + params);
                const [rows] = await conn.query(sql, params);
                console.log("[total rows] => " + rows.length);
                resolve(rows)
            } catch (error) {
                console.log(error)
                reject(error)
            } finally {
                this.release()
            }
        })
    }
}

module.exports = Database;
