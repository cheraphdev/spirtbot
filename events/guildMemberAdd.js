const Discord = require("discord.js")
//const welcomeSchema = require("../schemas/Welcome")
//const guildSchema = require("../schemas/Guild")
const config = require("../config")

module.exports = async (bot, message, user, member) => {

    /* Welcome (mongodb) */

    /*welcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
        if (err) throw err;
        if (!data) {
            return
        } else if (data) {
            let messageWelcome
            try {
                messageWelcome = data.text
                    .replace(/${user}/g, member)
                    .replace(/${user.tag}/g, member.tag)
                    .replace(/${server}/g, member.guild.name)
                    .replace(/${user.id}/g, member.id)
                    .replace(/${membercount}/g, member.guild.memberCount)
            } catch { }
            const defaultMessage = `Hey ${member}, welcome to ${member.guild.name}`;
            const channelSend = bot.channels.cache.get(data.channelId);

            let assignedRole = member.guild.roles.cache.get(data.role);

            try { await member.roles.add(assignedRole) } catch { }

            const Imageembed = new Discord.EmbedBuilder()
                .setImage("https://media.discordapp.net/attachments/1070999143629197384/1074265573556490311/Premium_18.png")
                .setColor(`${config.colorEmbed}`)

            const embed = new Discord.EmbedBuilder()
                .setDescription(messageWelcome == null ? defaultMessage : messageWelcome)
                .setColor(`${config.colorEmbed}`)
                .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            channelSend.send({ embeds: [Imageembed, embed], ephemeral: true })
        }
    })*/

    /* ---- */

    /* Antiraid (mysql) */

    let db = bot.db;

    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {

        if (req.length < 1) return;

        if (req[0].antiraid === "true") {

            try { await member.user.send("Vous ne pouvais pas rejoindre le serveur, car il et actuellement en mode antiraid.") } catch (err) { }
            await member.kick("Antiraid activé.")
        }
    }
    )

    /* ---- */

    

    /*const Data = await guildSchema.findOne({
        Guild: message.guild.id
    })
        .catch((err) => { });
    if (!Data) return;

    const guildData = {
        GuildLogChannel: Data.Channel
    };

    if (Data && Data.GuildLogChannel !== null) {
        const logChannel = await Promise.resolve(message.guild.channels.fetch(Data.GuildLogChannel));

        const logEmbed = new Discord.EmbedBuilder()
            .setColor(config.botinfo.colorEmbed)
            .setAuthor({
                name: `${message.author} | guildMemberAdd`,
            })
            .addFields(
                {
                    name: `Membre`,
                    value: `${member} (\`${member.id}\`)`,
                    inline: false,
                },
                {
                    name: `ID`,
                    value: `\`\`\`ini\nUser = ${member.id}\nID = ${user.id}\`\`\``,
                    inline: false,
                }
            )
            .setTimestamp();
        logChannel.send({ embeds: [logEmbed] });
    }*/
}