const Discord = require("discord.js")
const config = require("../config")

module.exports = {
    name: 'restart',
    description: '⚙️ Permet de relancer le bot. (Owner)',
    permission: "Any",
    ownerOnly: true,
    dm: false,

    async run(bot, interaction) {

        let Embed = new Discord.EmbedBuilder()
            .setDescription(`<:emoji_14:1033769858413899856> Je suis entrain de rechargé tous les fichier..`)
            .setColor(`${config.botinfo.colorEmbed}`)

        await interaction.reply({ embeds: [Embed], content: `⚙️ Un owner de <@${config.botinfo.botid(bot)}>, a redémarrer le bot !`, ephemeral: false });
        console.log('Le bot a été relancé');
        return process.exit();
    },
};