const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "manage-account",
    description: "💰 Gérer votre compte economy.",
    permission: "Any",
    ownerOnly: false,
    inDev: false,
    premiumOnly: false,
    dm: false,

    async run(interaction, message) {

        //let Data = economySchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });

        const createAccountButton = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("createAccount")
                    .setEmoji("<:validate:1071571218316152892>")
                    .setLabel("Créer")
                    .setStyle(Discord.ButtonStyle.Success)
            )
        const deleteAccountButton = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("deleteAccount")
                    .setEmoji("<:close:1071523654573236285>")
                    .setLabel("Supprimer")
                    .setStyle(Discord.ButtonStyle.Danger)
            )

        const infoAccountEmbed = new Discord.EmbedBuilder()
            .setColor(`${config.botinfo.colorEmbed}`)
            .setTitle("Account")
            .setDescription(`Choisir une option`)

        await message.reply({ embeds: [infoAccountEmbed], components: [createAccountButton, deleteAccountButton], ephemeral: true })
    }
}