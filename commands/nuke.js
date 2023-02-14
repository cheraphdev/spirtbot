const Discord = require("discord.js")
const config = require("../config.js")

module.exports = {

    name: "nuke",
    description: "⚠️ Nuke un salon.",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    ownerOnly: false,
    premiumOnly: false,
    dm: false,

    async run(bot, message) {

        message.channel.clone().then(msg => msg.send(`salon recréer par ${message.user}`))
        message.channel.delete()
    }
}