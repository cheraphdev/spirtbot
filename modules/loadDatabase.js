const mysql = require("mysql")
//const mongoose = require('mongoose')

module.exports = async () => {

         let db = await mysql.createConnection({
               host: "localhost",
               user: "root",
               password: "Google76!",
               database: "shirayo"
         })
         
         return db;
         
         //const connector = new MongoDBConnector(require('../config.js').database.mongodb_uri);
         //let dbmongoose = await mongoose.connect('mongodb+srv://user:4pTkNoyXZePjbO7g@cluster0.cnmqmgx.mongodb.net/?retryWrites=true&w=majority')
    
    connector.start();
}