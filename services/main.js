const FactoryModel = require('../models/factoryModel');
const pool = require('../database/connect');
const Unaunthenticated = require("../errors/unaunthenticated");
const BadRequest = require("../errors/bad-request");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
                reject(new BadRequest('something went wrong, check out the db'))
            } finally {
                this.endConnection();
            }
        });
    }

    validateUser(email, plainPassword) {
        console.log("BEGIN service.createToken");
        return new Promise(async (resolve, reject) => {
            try {
                await this.init();
                // let resultSelect = await this.user.getTest();

                const [dbemail] = await this.auth.getUserByEmail([email]);

                if (!dbemail) {
                    throw new Unaunthenticated('There is no user with this email');
                }


                const hashedPassword = await this.auth.getHashedPassword(email);

                const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword[0].hashed_password);
                if (!isPasswordValid) {

                    throw new Unaunthenticated('Email or password is incorrect');

                }


                const getUserInfo = await this.auth.getUserID(hashedPassword[0].hashed_password);

                console.log(getUserInfo);
                console.log("END service.createToken  :)");
                resolve(getUserInfo);
            } catch (error) {
                reject(error)
            } finally {
                this.endConnection();
            }
        });
    }


    registerUser(userName, plainPassword, email) {
        console.log("BEGIN service.RegisterUser");
        return new Promise(async (resolve, reject) => {
            try {
                await this.init();
                // let resultSelect = await this.user.getTest();



                const hashedPassword = await this.setHashedPassword(plainPassword);

                if (!hashedPassword) {
                    throw new Unaunthenticated('Email or password is incorrect');
                }


                const test = await this.user.registerUser([userName, plainPassword, email , hashedPassword]);

                console.log("END service.RegisterUser  :)");
                resolve(test);
            } catch (error) {
                reject(error)
            } finally {
                this.endConnection();
            }
        });
    }

    currentConnection() {
        return this.connection;
    }

    async setHashedPassword(plainPassword) {
        try {
            const hashedPassword = await bcrypt.hash(plainPassword, 10);
            console.log('Passwords hashed successfully:');
            console.log(hashedPassword)
            return hashedPassword
        } catch (error) {
            console.error('Error hashing passwords:', error);
            throw new BadRequest('ServerError');
        }
    }
    async endConnection() {
        if (this.connection != null) {
            this.connection.release();
            console.log(" connection is released ");
        }
    }
}

module.exports = service;
