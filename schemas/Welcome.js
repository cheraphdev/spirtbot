const { model, Schema } = require("mongoose")

const welcomeSchema = new Schema({
    guildId: String,
    channelId: String,
    text: String,
    role: String
});

module.exports = model("welcomeSchema", welcomeSchema);