const Discord = require("discord.js")
const config = require("../config")

module.exports = {
    name: 'pfc',
    description: '✂️ Jouer au pierre, feuille, ciseaux.',
    permission: "Any",
    ownerOnly: false,
    premiumOnly: false,
    dm: false,
    options: [
        {
            type: "string",
            name: "choice",
            description: "👀 Choisi soit pierre, feuille ou ciseaux.",
            required: true,
        },
    ],
    run(bot, message, args) {
        let choice = args.getString("choice")
        let botChoice = ["pierre", "feuille", "ciseaux"]
        botChoice = botChoice[Math.floor(Math.random() * botChoice.length)];

        const Embed = new Discord.EmbedBuilder()
            .setColor(`${config.botinfo.colorEmbed}`)
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        let result;
        if (choice === botChoice) {
            result = "Égalité";
        } else if ((choice === "pierre" && botChoice === "ciseaux") || (choice === "feuille" && botChoice === "pierre") || (choice === "ciseaux" && botChoice === "feuille")) {
            result = "Vous avez gagner";
        } else {
            result = "Vous avez perdu";
        }
        Embed.setDescription(`✂️ **LES RÉSULTATS SONT :**
 
        > **${message.user.tag} : **à choisi \`${choice}\`
        > **${bot.user.tag} : **à choisi \`${botChoice}\`
        > **Résultas : **${result}`);
        message.reply({ embeds: [Embed] });
    }
}