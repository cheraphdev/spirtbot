const Discord = require('discord.js')
const config = require("../config")

module.exports = {

    name: "userinfo",
    description: "❓Permet d'avoir des informations sur un utilisateur.",
    permission: "Any",
    ownerOnly: false,
    premiumOnly: false,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "👀 Le membre dont vous voulez obtenir davantage d'informations",
            required: false
        },
    ],

    async run(bot, message, args) {

        let user = args.getUser('membre')
        if (!user) user = message.user
        let member = message.guild.members.cache.get(user.id)

        const userFlags = await user.fetchFlags().then(e => e.toArray());
        let s;
        if (userFlags.size > 1) { s = "Badges" } else { s = "Badge" };

        const flags = {
            Staff: 'Staff',
            Partner: 'Partner',
            BugHunterLevel1: 'BugHunterLevel1',
            BugHunterLevel2: 'BugHunterLevel2',
            HypeSquadOnlineHouse1: 'HypeSquadOnlineHouse1',
            HypeSquadOnlineHouse2: 'HypeSquadOnlineHouse2',
            HypeSquadOnlineHouse3: 'HypeSquadOnlineHouse3',
            PremiumEarlySupporter: 'PremiumEarlySupporter',
            TeamPseudoUser: 'Équipe Discord',
            System: 'Système',
            VerifiedBot: 'VerifiedBot',
            VerifiedDeveloper: 'VerifiedDeveloper',
            CertifiedModerator: 'CertifiedModerator',
            ActiveDeveloper: '<:activedev:1067454485439459448>',
            Hypesquad: "Hypesquad",
            BotHTTPInteractions: "BotHTTPInteractions"
        };

        let presence = member ? member.presence ? member.presence.status : "Hors ligne" : "Inconnu";
        if (presence == "idle") presence = "🟡"; else if (presence == "Hors ligne") presence = "⚪"; else if (presence == "online") presence = "🟢"; else if (presence == "streaming") presence = "🟣"; else if (presence == "dnd") presence = "🔴"; else if (presence == "Inconnu") presence = "❓"

        let EmbedUserInfo = new Discord.EmbedBuilder()
            .setDescription(`<:user:1067450157001617441> Informations sur ${user.username}\n> <:user:1067450157001617441> **Nom** : \`${user.username}\` <@${user.id}>\n> <:tag:1067452063644135434> **Tag** : \`${user.discriminator}\`\n> <:bot:1067453055924179015> **Robot** : ${user.bot ? "Oui" : "Non"}\n> <:status:1067453731127431178> **Status** : ${presence}\n> <:badge:1067454855985238106> **${s}** : ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'Aucun'}\n> <:date:1067455898756337714> **Date de création du compte** : <t:${Math.floor(user.createdAt / 1000)}:F> (<t:${Math.floor(user.createdAt / 1000)}:R>)`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setColor(`${config.botinfo.colorEmbed}`)

        /*member ? EmbedUserInfo.addFields({name: `** **\n__Informations de ${user.username} sur ${message.guild.name}__`, value: `** **\n**Arrivée sur le serveur** : <t:${Math.floor(member.joinedAt / 1000)}:F> (<t:${Math.floor(member.joinedAt / 1000)}:R>)\n **Rôles[${member.roles.cache.size}]** : ${member.roles.cache.map(r => `${r}`).join(" ")}\n**Rôle le plus haut** : ${member.roles.highest}`}) : ""*/

        await message.reply({ embeds: [EmbedUserInfo] })
    }
}