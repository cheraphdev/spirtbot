const guildSchema = require("../schemas/Guild");
const Discord = require("discord.js");
const config = require("../config");

module.exports = async (client, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    const Data = await guildSchema.findOne({
        Guild: oldMessage.guild.id
    }).catch(() => { });

    if (Data?.GuildLogChannel) {
        const logChannel = await client.channels.fetch(Data.GuildLogChannel).catch(() => { });
        if (!logChannel) return;

        logChannel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor(config.botinfo.colorEmbed)
                    .setAuthor({
                        name: (oldMessage.author.tag + " | messageUpdate"),
                        iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
                    })
                    .addFields(
                        {
                            name: "Salon",
                            value: `${oldMessage.channel}`
                        },
                        {
                            name: "Nouveau message",
                            value: newMessage.content
                        },
                        {
                            name: "Ancien message",
                            value: oldMessage.content
                        },
                        {
                            name: `ID`,
                            value: `\`\`\`ini\nMESSAGE = ${oldMessage.id}\nUSER = ${oldMessage.author.id}\`\`\``
                        }
                    )
                    .setTimestamp(Date.now())
            ]
        });
    };
};