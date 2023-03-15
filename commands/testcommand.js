const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionsBitField } = require('discord.js')
const config = require("../config")

module.exports = {

    name: "testcommand",
    description: "⚙️ Configurer le système de ticket.",
    permission: Discord.PermissionFlagsBits.Administrator,
    ownerOnly: true,
    premiumOnly: false,
    dm: false,
    options: [
        {
            type: "user",
            name: "target",
            description: "📩 Salon d'envoie de l'embed du panel de ticket.",
            required: true,
        },
        {
            type: "string",
            name: "reason",
            description: "📩 Salon d'envoie de l'embed du panel de ticket.",
            required: true,
        }
    ],

    async run(bot, interaction) {

        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You must have the Kick Members permission to use this command", ephemeral: true });
        if (!kickMember) return await interaction.reply({ content: 'The user mentioned is no longer within the server', ephemeral: true });
        if (!kickMember.kickable) return await interaction.reply({ content: "I cannot kick this user because they have roles above me or you", ephemeral: true });

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given.";

        const dmEmbed = new EmbedBuilder()
            .setColor("DarkOrange")
            .setDescription(`:white_check_mark:  You have been kicked from **${interaction.guild.name} | Reason: ${reason}**`)

        const embed = new EmbedBuilder()
            .setColor("DarkOrange")
            .setDescription(`:white_check_mark:  ${kickUser.tag} has been **kicked** | Reason: ${reason}`)

        await kickMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });

        await kickMember.kick({ reason: reason }).catch(err => {
            interaction.reply({ content: "There was an error", ephemeral: true });
        });

        await interaction.reply({ embeds: [embed] });

    }
}