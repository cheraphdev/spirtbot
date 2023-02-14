const Discord = require("discord.js")
const config = require("../config.js")

module.exports = {

   name: "serverinfo",
   description: "❓Voir les information d'un serveur.",
   permission: "Any",
   ownerOnly: false,
   premiumOnly: false,
   dm: false,

    async run(bot, message) {
        const owner = message.guild.members.cache.get(message.guild.ownerId);

        const serverInfo = new Discord.EmbedBuilder()
            .setTitle(`Information sur le serveur ${message.guild}`)
            .setDescription(message.guild.description)
            .setThumbnail(message.guild.iconURL({ dynamic : true}))
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setColor(`${config.colorEmbed}`)
            .addFields([
                { name: 'Créateur', value: `${owner}` },
                { name: 'Date de création', value: message.guild.createdAt.toDateString() },
                { name: 'Nombre de membre(s)', value: `${message.guild.memberCount}` },
                { name: 'Niveau de boosts', value: `${message.guild.premiumTier}` }, // remove 'TIER_' from 'TIER_#'
                { name: 'Boost de serveur', value: `${message.guild.premiumSubscriptionCount}` },     
            ]);

		return message.reply({ embeds: [serverInfo] });
	},
}