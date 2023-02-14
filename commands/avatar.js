const Discord = require('discord.js')
const config = require("../config.js")

module.exports = {

    name: "avatar",
    description: "🖼️ Permet d'avoir l'avatar d'un utilisateur.",
    permission: "Any",
    ownerOnly: false,
    premiumOnly: false,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "👀 Le membre dont vous voulez obtenir l'avatar.",
            required: false
        },
    ],

    async run(bot, message, args) {

        let user = args.getUser('membre')
        if(!user) user = message.user

        let EmbedAvatar = new Discord.EmbedBuilder()
            .setAuthor({name: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setDescription(`**Voici l'avatar de ${user.username}**`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setColor(`${config.colorEmbed}`)
        
        await message.reply({embeds: [EmbedAvatar]})
    }
}