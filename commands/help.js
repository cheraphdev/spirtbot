const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "help",
    description: "🧰 Avoir plus d'information.",
    permission: "Any",
    ownerOnly: false,
    premiumOnly: false,
    dm: false,

    async run(bot, message) {
        let button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Support")
                    .setURL("https://discord.gg/wtzJzBvyBR")
                    .setStyle(Discord.ButtonStyle.Link),

                new Discord.ButtonBuilder()
                    .setLabel("Invitation")
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${config.botinfo.botid(bot)}&scope=bot&permissions=8`)
                    .setStyle(Discord.ButtonStyle.Link),

                new Discord.ButtonBuilder()
                    .setCustomId("bug-report")
                    .setLabel("Signaler un bug")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setDisabled(false)
            )

        let ImageHelpEmbed = new Discord.EmbedBuilder()
            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071403992518758540/IMG_0372.png")
            .setColor(`${config.botinfo.colorEmbed}`)

        let helpEmbed = new Discord.EmbedBuilder()
            .setDescription(`**Note:** Veuillez vérifier les autorisations de <@${config.botinfo.botid(bot)}> avant d'exécuter les commandes.`)
            .addFields(
                { name: '🔐 Protection / Configuration', value: '▫️`/ticket` = Permet de mettre en place le système de ticket.\n▫️`/setantiraid` = Permet de configurer le système d\'antiraid.' },
                { name: '👮🏼‍♂️ Modération', value: '▫️`/kick` = Permet de kick un membre.\n▫️`/nuke` = Permet de supprimer le salon et de le recréer avec les même permission.\n▫️`/clear` = Supprimer des message(s).' },
                { name: '💰 Economy', value: '▫️`/manage-account` = Gérer sont compte dans le système d\'économie.', inline: true },
                { name: '💭 Utilité / Fun / Information', value: `▫️\`/gtn\` = Pour lancer un Guess The Number.\n▫️\`/premium\` = Voir les avantage du mode premium de <@${config.botinfo.botid(bot)}>.\n▫️\`/say\` = Parler a la place du robot.\n▫️\`/pfc\` = Jouer au 1.2.3.. pierre, feuille, ciseaux.\n▫️\`/avatar\` = Avoir le lien de l\'avatar d\'un membre.\n▫️\`/userinfo\` = Savoir les information sur un utilisateur.\n▫️\`/serverinfo\` = Avoir les information sur un serveur Discord.` },
                { name: '🤖 Bot Informations', value: '▫️`/botinfo` = Avoir les information du robot.\n▫️`/ping` = Voir la lattence du robot.', inline: true },
            )
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setColor(`${config.botinfo.colorEmbed}`)

        await message.reply({ embeds: [ImageHelpEmbed, helpEmbed], components: [button], ephemeral: false })
    }
}