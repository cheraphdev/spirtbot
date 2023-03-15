const Discord = require("discord.js")
const guildSchema = require("../schemas/Guild")

module.exports = async (bot, guild) => {

    const GuildInfo = await guildSchema
        .findOne({ Guild: guild.id })
        .catch((err) => { });
    if (!GuildInfo) return;
    await GuildInfo.delete();

}