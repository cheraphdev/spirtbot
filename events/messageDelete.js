const guildSchema = require("../schemas/Guild")
const Discord = require("discord.js")
const config = require("../config")

module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const Data = await guildSchema.findOne({
        Guild: message.guild.id
    })
        .catch((err) => { });
    if (!Data) return;

    const guildData = {
        GuildLogChannel: Data.Channel
    };

    if (Data && Data.GuildLogChannel !== null) {
        const logChannel = await Promise.resolve(message.guild.channels.fetch(Data.GuildLogChannel));

        let userNickname = ` (${message.member.nickname ?? ""})`;
        if (userNickname == " (null)") {
            userNickname = "";
        }

        const logEmbed = new Discord.EmbedBuilder()
            .setColor(config.botinfo.colorEmbed)
            .setAuthor({
                name: `${message.author.tag}` + userNickname + " | messageDelete",
                iconURL: `${message.member.user.displayAvatarURL()}`,
            })
            .addFields(
                {
                    name: `Channel`,
                    value: `${message.channel}`,
                    inline: false,
                },
                {
                    name: `Message`,
                    value: `${message.content}`,
                    inline: false,
                },
                {
                    name: `ID`,
                    value: `\`\`\`ini\nUser = ${message.member.id}\nID = ${message.id}\`\`\``,
                    inline: false,
                }
            )
            .setTimestamp();
        logChannel.send({ embeds: [logEmbed] });
    }
}