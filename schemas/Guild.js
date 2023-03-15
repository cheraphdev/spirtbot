const { model, Schema } = require("mongoose");

let guildSchema = new Schema({
    Guild: String,
    GuildLogChannel: String
});

module.exports = model("guildSchema", guildSchema);