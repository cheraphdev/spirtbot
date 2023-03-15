const Discord = require("discord.js")
const guildSchema = require("../schemas/Guild")

module.exports = async (bot, guild) => {

    let db = bot.db;

    db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {

        if (req.length < 1) {
            db.query(`INSERT INTO server (guild, antiraid) VALUES (${guild.id}, 'false')`)
        }
    })

    let data = new guildSchema({
        Guild: guild.id,
        GuildLogChannel: "1074100747450449981",
    });
    data.save();

}