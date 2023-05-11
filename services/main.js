const FactoryModel = require('../models/factoryModel');
const pool = require('../database/connect');
const Unaunthenticated = require("../errors/unaunthenticated");
const bcrypt = require('bcrypt');

class service {
    constructor() {
        this._connection = null;
    }

    async init() {
        await this.createConnection();
        this._user = FactoryModel.user(this);
        this._auth = FactoryModel.auth(this);
    }

    get user() {
        return this._user;
    }
    get connection() {
        return this._connection;
    }
    get auth() {
        return this._auth;
    }



    set connection(connection) { this._connection = connection };
    async createConnection() {
        if (this.connection == null) {
            this.connection = await pool.getConnection();
            console.log("[SERVICE] a new connection is created for this new service ");
        } else {
            console.log("[SERVICE] an existing connection it is gonna be used");
        }
        return this.connection;
    }

    test(test) {
        console.log("BEGIN service.test");
        return new Promise(async (resolve, reject) => {
            try {
                await this.init();
                let resultSelect = await this.user.getTest();
                console.log("END service.test  :)");
                resolve(resultSelect);
            } catch (error) {
                reject(error)
            }
        });
    }

    validateUser(email, password) {
        console.log("BEGIN service.createToken");
        return new Promise(async (resolve, reject) => {
            try {
                await this.init();
                // let resultSelect = await this.user.getTest();

                const [dbemail] = await this.auth.getUserByEmail([email]);

                if (!dbemail) {
                    throw new Unaunthenticated('Invalid credentials');
                }

               
                const isPasswordValid = await this.comparePassword(password,email);

              

                console.log("END service.createToken  :)");
                resolve(isPasswordValid);
            } catch (error) {
                reject(error)
            }
        });
    }
    async comparePassword(plainPassword,email) {
        const hashedPassword = await this.auth.getHashedPassword(email);
        console.log( typeof hashedPassword[0].hashed_password);
        console.log( typeof plainPassword);
        return await bcrypt.compare(plainPassword, hashedPassword[0].hashed_password);
    };
    currentConnection() {
        return this.connection;
    }
}

module.exports = service;
