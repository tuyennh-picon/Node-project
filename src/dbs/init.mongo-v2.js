const mongoose = require("mongoose");

const {countConnections} = require('../helpers/check-connect');

class Database {
    constructor() {
        this.connect();
    }

    connect(type = "mongodb") {
        mongoose.connect('mongodb://root:example@localhost:27018/shop_dev?authSource=admin').then(() => {
            console.log('connect successfully V2')
            countConnections()       
         })
        .catch((err) =>  console.log(`Connect DB err: ${err}`))

        mongoose.set('debug', true)
    }

    static getInstance(){
        if(!Database.instance) {
            Database.instance = new Database();
        }    

        return Database.instance
    }
}

const mongodbInstance = Database.getInstance();
module.exports = mongodbInstance;