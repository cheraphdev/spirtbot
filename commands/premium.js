const Discord = require("discord.js")
const config = require("../config.js")

module.exports = {

   name: "premium",
   description: "⭐️ Voir les avantage du premium.",
   permission: "Any",
   ownerOnly: false,
   premiumOnly: false,
   dm: false,

    async run(bot, message) {
    
        let ImagePremiumEmbed = new Discord.EmbedBuilder()
            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071397649716105236/IMG_0370.png")
            .setColor(`${config.colorEmbed}`)

        let PremiumEmbed = new Discord.EmbedBuilder()
            .setTitle('<:premium:1071390310485217330> Informations sur le premium')
            .setThumbnail('https://images-ext-2.discordapp.net/external/BkQyeJESTRCwjV3ioyV8MxMxqUHjeZro06cnx4aAByc/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1067077813057888318/f5a5085666b680e6eceb9ae49256ca15.webp')
            .setDescription("Le premium de SpirtBot débloque de très bonne fonctionnalités pour avoir une expérience plus agréable et avancé du robot. Il débloque notament une commande, `/embed-builder`. Il est obtenable gratuitement en demandent à **cheraph#6290**.\n\n<:premium:1071390310485217330> | Actuellement, `2` utilisateur(s) ont le premium.")
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setColor(`${config.colorEmbed}`)

        await message.reply({embeds: [ImagePremiumEmbed, PremiumEmbed], ephemeral: false})
    }
}