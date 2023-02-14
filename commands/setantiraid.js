const Discord = require("discord.js")
const config = require("../config.js")

module.exports = {

   name: "setantiraid",
   description: "⚙️ Configurer l'antiraid.",
   permission: Discord.PermissionFlagsBits.ManageGuild,
   ownerOnly: false,
   premiumOnly: false,
   dm: false,
   options: [
        {
            type: "string",
            name: "status",
            description: "❓État de l'antiraid. (on / off)",
            required: true,
            autocomplete: true
        }
   ],

   async run(bot, message, args, db) {
   
           let etat = args.getString("status")
           if(etat !== "on" && etat !== "off") return message.reply("Indique on ou off.")
           
           if(etat === "off") {
           
                db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guildId}'`)
                const OffImageEmbed = new Discord.EmbedBuilder()
                .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071415811169853561/Premium_6.png")
                .setColor(`${config.colorEmbed}`)
                
                const OffEmbed = new Discord.EmbedBuilder()
      .setColor(`${config.colorEmbed}`)
      .setDescription(`L'antiraid est bien désactiver.`)
      .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
                await message.reply({embeds: [OffImageEmbed, OffEmbed], ephemeral: false})      
           } else {
                
                db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guildId}'`)
                const OnImageEmbed = new Discord.EmbedBuilder()
                .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071414996275314748/IMG_0374.png")
                .setColor(`${config.colorEmbed}`)
                
                const OnEmbed = new Discord.EmbedBuilder()
      .setColor(`${config.colorEmbed}`)
      .setDescription(`L'antiraid est bien activé.`)
      .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
                await message.reply({embeds: [OnImageEmbed, OnEmbed], ephemeral: false})
           }
   }
}