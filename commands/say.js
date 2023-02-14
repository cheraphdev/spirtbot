const Discord = require("discord.js")
const { EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")
const config = require("../config.js")
 
module.exports = {
 
  name: "say",
  description: "💬 Je parle à ta place, fantastique.",
  permission: Discord.PermissionFlagsBits.Administrator,
  ownerOnly: false,
  premiumOnly: false,
  dm: false,
 
  async run(bot, message, args) {
 
    let Modal = new Discord.ModalBuilder()
    .setCustomId('report')
    .setTitle('Shirayo - Say')
 
    let question1 = new Discord.TextInputBuilder()
    .setCustomId('saychat')
    .setLabel("Que dois-je dire ?!")
    .setRequired(true)
    .setPlaceholder('Indiquez la description ici')
    .setStyle(TextInputStyle.Paragraph)
  
    let ActionRow1 = new Discord.ActionRowBuilder().addComponents(question1);
 
    Modal.addComponents(ActionRow1)
 
    await message.showModal(Modal)
 
    try {

      let reponse = await message.awaitModalSubmit({time: 300000})

      let whatToSay = reponse.fields.getTextInputValue('saychat')
  
      const EmbedSay = new Discord.EmbedBuilder()
      .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
      .setColor(`${config.colorEmbed}`)
      .setDescription(`Votre texte s'est envoyé correctement.`)

      await message.channel.send({ content: whatToSay });
   
      await reponse.reply({embeds: [EmbedSay], ephemeral: true})

    } catch (err) { return; }
  }
}