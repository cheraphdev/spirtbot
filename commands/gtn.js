const Discord = require("discord.js")
const config = require("../config")
const guessthenumber = require("../schemas/GuessTheNumber");

module.exports = {

  name: "gtn",
  description: "⚙️ Configurer le système de jeux. (Guess the number)",
  permission: Discord.PermissionFlagsBits.ManageGuild,
  ownerOnly: false,
  inDev: true,
  premiumOnly: false,
  dm: false,
  options: [
    {
      type: "channel",
      name: "channel",
      description: "📩 Salon pour démarrer le système.",
      required: true,
      autocomplete: false
    },
    {
      type: "string",
      name: "amount",
      description: "🔢 Le nombre(s) à trouver.",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, interaction) {
    const { options, guild, user } = interaction;

    const Channel = options.getChannel("channel");
    const Amount = options.getString("amount");

    const data = await guessthenumber
      .findOne({ Guild: guild.id })
      .catch((err) => { });
    if (!data) {
      await guessthenumber
        .create({ Guild: guild.id, Channel: Channel.id, number: Amount })
        .catch((err) => { });
    }

    await interaction.reply({
      content: `<:premium:1071390310485217330> Le système de jeux de chiffres a bien été démarrer et sauvegarder dans la base de donnée !\nSalon: ${Channel} | Chiffre: ${Amount}.`,
      ephemeral: true,
    });
  },
}