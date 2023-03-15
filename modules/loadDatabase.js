const mysql = require("mysql")
//const mongoose = require('mongoose')
const config = require("../config")

module.exports = async () => {

      let db = await mysql.createConnection({
            host: `${config.dbinfo.mysql.host}`,
            user: `${config.dbinfo.mysql.user}`,
            password: `${config.dbinfo.mysql.password}`,
            database: `${config.dbinfo.mysql.database}`
      })
      return db;

}