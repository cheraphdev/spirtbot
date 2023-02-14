const Discord = require("discord.js")
const { PermissionsBitField } = require('discord.js')
const config = require("../config.js")

module.exports = {

   name: "kick",
   description: "🚪Permet de kick un membre.",
   permission: Discord.PermissionFlagsBits.KickMembers,
   ownerOnly: false,
   premiumOnly: false,
   dm: false,
   options: [
          {
                 type: "user",
                 name: "utilisateur",
                 description: "👤 La personne a kick.",
                 required: true,
          },
          {
                 type: "string",
                 name: "raison",
                 description: "📩 La raison du kick.",
                 required: false,
          }
   ],
        
        async run(bot, interaction) {
        
        const kickUser = interaction.options.getUser('utilisateur');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "<:close:1071523654573236285> Vous devez avoir l'autorisation `Kick_Members` pour utiliser cette commande.", ephemeral: true });
        if (!kickMember) return await interaction.reply({ content: '<:close:1071523654573236285> L\'utilisateur mentionné n\'est plus sur le serveur.', ephemeral: true});
        if (!kickMember.kickable) return await interaction.reply({ content: "<:close:1071523654573236285> Je ne peux pas expulser cet utilisateur car il a des rôles au-dessus de moi ou de vous.", ephemeral: true});

        let reason = interaction.options.getString('raison');
        if (!reason) reason = "Aucune raison donnée.";
        
        /* Embed dm */

        const ImagedmEmbed = new Discord.EmbedBuilder()
        .setColor(`${config.colorEmbed}`)
        .setImage("https://media.discordapp.net/attachments/1070999143629197384/1074070558188257390/Premium_16.png")
        
        const dmEmbed = new Discord.EmbedBuilder()
        .setColor(`${config.colorEmbed}`)
        .setDescription(`<:delete:1071569503051317390> Vous avez été kick du serveur \`${interaction.guild.name}\` !\n<:edit:1071563254834397277> Raison: ${reason}`)
        .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})

        let serverButton = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("ping")
                    .setEmoji("📝")
                    .setLabel(`Serveur ID: ${interaction.guild.id}`)
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setDisabled(true)
               )
        
        /* ---- */
        
        /* Embed channel */
        
        const Imageembed = new Discord.EmbedBuilder()
        .setColor(`${config.colorEmbed}`)
        .setImage("https://media.discordapp.net/attachments/1070999143629197384/1074072781135826954/Premium_17.png")
        
        const embed = new Discord.EmbedBuilder()
        .setColor(`${config.colorEmbed}`)
        .setDescription(`<:user:1067450157001617441> ${kickUser.tag} à bien été kick.\n<:edit:1071563254834397277> Raison: ${reason}`)
        .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
        
        /* ---- */

        await kickMember.send({ embeds: [ImagedmEmbed, dmEmbed], components: [serverButton] }).catch(err => {
            return;
        });

        await kickMember.kick({ reason: reason }).catch(err => {
            interaction.reply({ content: "Il y a une erreur.", ephemeral: true});
        });

        await interaction.reply({ embeds: [Imageembed, embed] });

    }
}