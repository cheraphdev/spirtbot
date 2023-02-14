This is my Ban Command
```js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('This commands bans a server member')
    .addUserOption(option => option.setName('target').setDescription('The user you would like to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for banning the user.')),
    async execute (interaction, client) {

        const banUser = interaction.options.getUser('target');
        const banMember = await interaction.guild.members.fetch(banUser.id);
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "You must have the ban Members permission to use this command", ephemeral: true });
        if (!banMember) return await interaction.reply({ content: 'The user mentioned is no longer within the server', ephemeral: true});
        if (!banMember.kickable) return await interaction.reply({ content: "I cannot ban this user because they have roles above me or you", ephemeral: true});

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given.";

        const dmEmbed = new EmbedBuilder()
        .setColor("DarkOrange")
        .setDescription(`:white_check_mark:  You have been banned from **${interaction.guild.name} | Reason: ${reason}**`)

        const embed = new EmbedBuilder()
        .setColor("DarkOrange")
        .setDescription(`:white_check_mark:  ${banUser.tag} has been **banned** | Reason: ${reason}`)

        await banMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });

        await banMember.ban({ reason: reason }).catch(err => {
            interaction.reply({ content: "There was an error", ephemeral: true});
        });

        await interaction.reply({ embeds: [embed] });

    }
}```