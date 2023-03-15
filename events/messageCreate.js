const Discord = require("discord.js")
const config = require("../config")
const guessthenumber = require("../schemas/GuessTheNumber")
const axios = require("axios")

module.exports = async (bot, message) => {

  /* Pour le système de Guess The Number (mongodb) */

  /*const Data = await guessthenumber
    .findOne({ Guild: message.guild.id })
    .catch((err) => { });
  if (!Data) return;

  const guess = {
    Channel: Data.Channel,
    number: Data.number,
  };
  if (
    Number.isInteger(parseInt(message.content)) &&
    parseInt(message.content) == guess.number &&
    message.channel.id == guess.Channel
  ) {
    message.react("✅").catch((err) => { });
    message
      .reply({ content: `Félicitations ! Cet utilisateur a deviné le bon numéro.` })
      .catch((err) => { });
    await Data.delete();
  }*/

  /* ------- */

  /* Event mention */

  if (message.content === `<@${config.botinfo.botid(bot)}>`) {
    return message
      .reply("Hmm? Tu a besoin d'aide ? Utilise `/help` 🙂")
      .catch((err) => { })
  }

  /* ------- */

}