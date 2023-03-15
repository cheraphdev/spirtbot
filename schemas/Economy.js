const { model, Schema } = require("mongoose");

let economySchema = new Schema({
     Guild: String,
     User: String,
     Bank: String,
     Wallet: String
});

module.exports = model("economySchema", economySchema);