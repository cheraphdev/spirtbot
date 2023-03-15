const { model, Schema } = require("mongoose")

const welcomeSchema = new Schema({
    Guild: String,
    Channel: String,
    Msg: String
    //Role: String
});

module.exports = model("welcomeSchema", welcomeSchema);