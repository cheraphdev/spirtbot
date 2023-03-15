const guildSchema = require("../schemas/Guild")
const Discord = require("discord.js")
const config = require("../config")

module.exports = async (channel, guild, bot, message) => {

    /*const Data = await guildSchema.findOne({
        Guild: guild.id,
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
                name: `${message.author.tag} messageDelete`,
                iconURL: `${message.member.user.displayAvatarURL()}`,
            })
            .addFields(
                {
                    name: `Channel`,
                    value: `${channel}`,
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
    }*/
}