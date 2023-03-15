const Discord = require("discord.js")
const logs = require("discord-logs")
const { EmbedBuilder } = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({ intents })
const { connect } = require("mongoose")
const loadCommands = require("./modules/loadCommands")
const loadEvents = require("./modules/loadEvents")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.function = {
    createId: require("./fonctions/createId")
}

/* Logs Event */

console.log(String.raw`
   _____       _      _   ____        _   
  / ____|     (_)    | | |  _ \      | |  
 | (___  _ __  _ _ __| |_| |_) | ___ | |_ 
  \___ \| '_ \| | '__| __|  _ < / _ \| __|
  ____) | |_) | | |  | |_| |_) | (_) | |_ 
 |_____/| .__/|_|_|   \__|____/ \___/ \__|
        | |                               
        |_|                               
     Dev by cheraph#6290 ❤️
`)

//bot.host = `${config.appinfo.host}${config.appinfo.port === 8080 ? "" : `:${config.appinfo.port}`}`;

logs(bot, {
    debug: true
});

/* Logs Guild */

bot.on('guildCreate', (guild) => {
    const ImageguildCreate = new EmbedBuilder()
        .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071794913672441876/Premium_14.png")
        .setColor(`${config.botinfo.colorEmbed}`)

    const guildCreate = new EmbedBuilder()
        .setTitle("<:validate:1071571218316152892> Log guildCreate")
        .setDescription(`${bot.user.username} à rejoint **${guild.name}** !\n\`\`\`MEMBRE(S) = ${guild.memberCount}\nGUILD = ${guild.id}\`\`\``)
        .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor(`${config.botinfo.colorEmbed}`)

    bot.channels.cache.get(`${config.channelinfo.logsGuild}`).send({ embeds: [ImageguildCreate, guildCreate] }).catch(error => {
        return;
    });
});

bot.on('guildDelete', (guild) => {
    const ImageguildDelete = new EmbedBuilder()
        .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071795163405488198/Premium_15.png")
        .setColor(`${config.botinfo.colorEmbed}`)

    const guildDelete = new EmbedBuilder()
        .setTitle("<:close:1071523654573236285> Log guildDelete")
        .setDescription(`${bot.user.username} à quitter **${guild.name}** !\n\`\`\`MEMBRE(S) = ${guild.memberCount}\nGUILD = ${guild.id}\`\`\``)
        .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor(`${config.botinfo.colorEmbed}`)

    bot.channels.cache.get(`${config.channelinfo.logsGuild}`).send({ embeds: [ImageguildDelete, guildDelete] }).catch(error => {
        return;
    });
});

bot.login(config.botinfo.token)
loadCommands(bot)
loadEvents(bot)