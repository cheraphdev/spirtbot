const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "botinfo",
    description: "🤖 Voir les information du bot.",
    permission: "Any",
    ownerOnly: false,
    premiumOnly: false,
    dm: false,

    async run(bot, message) {

        let ImageBotInfoEmbed = new Discord.EmbedBuilder()
            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071402313895395348/IMG_0371.png")
            .setColor(`${config.botinfo.colorEmbed}`)

        let BotInfoEmbed = new Discord.EmbedBuilder()
            .setTitle('Informations')
            .setDescription("Voici quelques informations me conernant :")
            .addFields(
                { name: "Slashcommands", value: `${bot.commands.size}`, inline: true },
                { name: "Serveurs", value: `${bot.guilds.cache.size}`, inline: true },
                { name: "Utilisateurs", value: `${bot.users.cache.size}`, inline: true },
                { name: 'Développeur', value: `${require('../package.json').author || "Unknown#0000"}`, inline: true },
                { name: 'Discord.JS', value: `${require('../package.json').dependencies['discord.js'].replace('^', '')}`, inline: true },
                { name: "Node.JS", value: `${process.version}`, inline: true },
            )
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setColor(`${config.botinfo.colorEmbed}`)

        await message.reply({ embeds: [ImageBotInfoEmbed, BotInfoEmbed], ephemeral: false })
    }
}