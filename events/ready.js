const Discord = require("discord.js")
const mongoose = require("mongoose")
const config = require("../config")
const loadDatabase = require("../modules/loadDatabase")
const loadSlashCommand = require("../modules/loadSlashCommands")
const { ActivityType } = require('discord.js')
const bot = require('../main').bot;

module.exports = async (bot, db) => {

    /* Connecter mysql */
    bot.db = await loadDatabase()
    bot.db.connect(function (err) {
        if (err) console.log(err)
        console.log("[DB]: MySQL connecté !")
    })
    /* ------ */

    /* Load les slashcommand */
    await loadSlashCommand(bot)
    /* ------ */

    /* Connecter mongodb */
    await mongoose.connect(config.dbinfo.mongodb || '', {
        keepAlive: true,
    });

    if (mongoose.connect) {
        console.log("[DB]: Mongoose connecté !")
    }
    /* ------ */

    /* Dashboard */
    //require("../app")(bot, db);
    /* ------ */

    /* Event bot */
    console.log(`[Bot]: ${bot.user.tag} connecter !`)

    bot.user.setPresence({
        activities: [{ name: `/help | ${bot.guilds.cache.size} serveur(s) ❤️`, type: ActivityType.Watching }],
        status: 'online',
    });
    /* ------ */
}