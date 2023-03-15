const Discord = require("discord.js")
const guildSchema = require("../schemas/Guild")
const config = require("../config")

module.exports = {

    name: "setlogs",
    description: "⚙️ Configurer le système de logs.",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    ownerOnly: false,
    premiumOnly: false,
    dm: false,
    options: [
        {
            type: "channel",
            name: "channel",
            description: "⚙️ Salon ou le bot vas envoyer les logs.",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, interaction, message, args) {
        const { channel, options } = interaction;

        const logsChannel = options.getChannel("channel");

        //let data = guildSchema.findOneAndUpdate({ Guild: interaction.guild.id }, async (err, data) => {
            //if (!data) {
                 await guildSchema.updateOne({
                    Guild: interaction.guild.id,
                    GuildLogChannel: logsChannel.id,
                });

                const replyEmbed = new Discord.EmbedBuilder()
                    .setColor(config.botinfo.colorEmbed)
                    .setTitle(`Configuration des logs`)
                    .addFields(
                        {
                            name: `Guild ID`,
                            value: `${interaction.guild.id}`,
                            inline: true,
                        },
                        {
                            name: `Guild log channel`,
                            value: `${logsChannel}`,
                            inline: true,
                        }
                    )
                    .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

                interaction.reply({ embeds: [replyEmbed] });
            }
        }
        
    
