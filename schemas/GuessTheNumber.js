const { model, Schema } = require("mongoose")

let GuessTheNumber = new Schema({
    Guild: String,
    Channel: String,
    number: Number
});

module.exports = model("GuessTheNumber", GuessTheNumber);