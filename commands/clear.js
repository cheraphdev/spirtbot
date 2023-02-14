const Discord = require("discord.js")
const config = require("../config.js")

module.exports = {

   name: "clear",
   description: "🗑️ Supprimer des message(s).",
   permission: Discord.PermissionFlagsBits.ManageMessages,
   ownerOnly: false,
   premiumOnly: false,
   dm: false,
   options: [
        {
            type: "string",
            name: "amount",
            description: "🔢 Nombre(s) de message(s) à supprimer.",
            required: true,
            autocomplete: false
        }
   ],


    async run(bot, message, args) {
    
    const amountToDelete = args.getString("amount");

        message.channel.bulkDelete(amountToDelete, true);

        const singularOrPlural = amountToDelete == 1 ? 'message' : 'messages';
        const amountDescription = `Vous avez supprimer ${amountToDelete} ${singularOrPlural} !`;
            
        const clearEmbed = new Discord.EmbedBuilder()
            .setDescription(amountDescription)
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setColor(`${config.colorEmbed}`)
        message.reply({ embeds: [clearEmbed], ephemeral: false });
	}

}