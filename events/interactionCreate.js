const Discord = require("discord.js")
const ownerId = ["1056780751133224990"];
const premiumId = ["1056780751133224990", "986621867194474587"];
const BlackListFile = require("../blacklist.json")
const BlackList = BlackListFile.userID
const config = require("../config.js")

module.exports = async (bot, interaction) => {

if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

let entry = interaction.options.getFocused()

if(interaction.commandName === "setcaptcha" || interaction.commandName === "setantiraid") {

let choices = ["on", "off"]
let sortie = choices.filter(c => c.includes(entry))
await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
}
}

if(interaction.type === Discord.InteractionType.ApplicationCommand) {

   if(BlackList.indexOf(interaction.user.id) !== -1){
            try {
                if (!interaction.isButton())
                interaction.reply({content: "*Oupss*.. Tu ne peux plus communiquer avec **SpirtBot** puisque tu es **blacklist**.", ephemeral: false })
                return;
            } catch(error){};
        }
   let command = require(`../commands/${interaction.commandName}`)
   if (command.ownerOnly && !ownerId.includes(interaction.user.id)) return interaction.reply('Seul le développeur du bot peut utiliser cette commande !');
   if (command.premiumOnly && !premiumId.includes(interaction.user.id)) return interaction.reply('Seul les premium du bot peut utiliser cette commande !');
   command.run(bot, interaction, interaction.options, bot.db)
   }
   
           if(interaction.isButton()) {
            
                 if(interaction.customId === "ticket") {
                 
                       let channel = await interaction.guild.channels.create({
                              name: `ticket-${interaction.user.username}`,
                              type: Discord.ChannelType.GuildText
                       })
                       
                       await channel.setParent(interaction.channel.parent.id)
                       
                       await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                             ViewChannel: false
                       })
                       await channel.permissionOverwrites.create(interaction.user, {
                             ViewChannel: true,
                             EmbedLinks: true,
                             SendMessages: true,
                             AttachFiles: true,
                             ReadMessageHistory: true
                       })
                       
                       await channel.setTopic(interaction.user.id)
                       await interaction.reply({content: `Votre ticket a correctement été créé : ${channel}`, ephemeral: true})
                       
                       let ImageTicketCreateEmbed = new Discord.EmbedBuilder()
                       .setColor(`${config.colorEmbed}`)
                       .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071520832851034233/Premium_7.png")
                       
                       let TicketCreateEmbed = new Discord.EmbedBuilder()
                       .setColor(`${config.colorEmbed}`)
                       .setTitle("<:info:1071521506573701120> Demande de support")
                       .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                       .setDescription("Veuillez indiquer le motif de votre demande de support. Si cette demande était une erreur, appuyez sur le bouton ci-dessous.")
                       .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})
                       
                       const closeButton = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
           .setCustomId("close")
           .setLabel("Annuler / Fermer le ticket")
           .setStyle(Discord.ButtonStyle.Danger)
           .setEmoji("<:close:1071523654573236285>"))
           
                       await channel.send({content: `<@${interaction.user.id}>`, embeds: [ImageTicketCreateEmbed, TicketCreateEmbed], components: [closeButton]})
                 }
                 
                 if(interaction.customId === "close") {
                 
                       let user = bot.users.cache.get(interaction.channel.topic)
                       try {await user.send("Votre ticket a été fermé.")} catch (err) {}
                       
                       await interaction.channel.delete()
                 }
            }
           
           //reload ping
           if(interaction.customId === "ping") {

            let reloadPing = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("ping")
                    .setEmoji("🔄")
                    .setLabel("Actualiser")
                    .setStyle(Discord.ButtonStyle.Success)
            )
            const pingUser = Date.now() - interaction.createdTimestamp;
                let emojiUser;
                if(pingUser < 200) { emojiUser = "🟢" } 
                else if (pingUser < 400 && pingUser > 200) { emojiUser = "🟠" }
                else if(pingUser > 400) {emojiUser = "🔴" };
                //Ping de l'api Discord
                const APIPing = bot.ws.ping;
                let APIemoji;
                if(APIPing < 200) { APIemoji = "🟢" }
                else if(APIPing < 400 && APIPing > 200) { APIemoji = "🟠" }
                else if(APIPing > 400) {APIemoji = "🔴" }

            let PingEmbed = new Discord.EmbedBuilder()
                .setDescription(`
                \`${emojiUser}\` Pong ! | Votre ping : **${pingUser}ms**
                \`${APIemoji}\` Pong ! | API Discord ping : **${APIPing}ms**`)
                .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: 'https://images-ext-2.discordapp.net/external/BkQyeJESTRCwjV3ioyV8MxMxqUHjeZro06cnx4aAByc/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1067077813057888318/f5a5085666b680e6eceb9ae49256ca15.webp' })
                .setColor(`${config.colorEmbed}`)

            await interaction.deferUpdate()
            await interaction.editReply({embeds: [PingEmbed], components: [reloadPing]})
        }
        
        //info page
           if(interaction.customId === "info") {

            let reloadHelp = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("help")
                    .setEmoji("💭")
                    .setLabel("Retour")
                    .setStyle(Discord.ButtonStyle.Success)
            )
            
            let infoEmbed = new Discord.EmbedBuilder()
                .setDescription("Bientôt...")
                .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: 'https://images-ext-2.discordapp.net/external/BkQyeJESTRCwjV3ioyV8MxMxqUHjeZro06cnx4aAByc/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1067077813057888318/f5a5085666b680e6eceb9ae49256ca15.webp' })
                .setColor(`${config.colorEmbed}`)

            await interaction.deferUpdate()
            await interaction.editReply({embeds: [infoEmbed], components: [reloadHelp]})
            }
            
            
                    //help page
           if(interaction.customId === "help") {

            let reloadInfo = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("info")
                    .setEmoji("❓")
                    .setLabel("Information")
                    .setStyle(Discord.ButtonStyle.Success)
            )
            
            let helpEmbed1 = new Discord.EmbedBuilder()
            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071403992518758540/IMG_0372.png")
            .setColor(`${config.colorEmbed}`)
            
            let helpEmbed = new Discord.EmbedBuilder()
            .setDescription("**Note:** Veuillez vérifier les autorisations de <@1067077813057888318> avant d'exécuter les commandes.")
            	.addFields(
            	{ name: '🔐 Protection / Configuration', value: '▫️`/ticket` = Permet de mettre en place le système de ticket.\n▫️`/setantiraid` = Permet de configurer le système d\'antiraid.' },
            	{ name: '👮🏼‍♂️ Modération', value: '▫️`/kick` = Permet de kick un membre.\n▫️`/nuke` = Permet de supprimer le salon et de le recréer avec les même permission.\n▫️`/clear` = Supprimer des message(s).\n▫️`/embed-builder` = Crée un embed personnalisé !' },
		{ name: '💭 Utilité / Fun / Information', value: '▫️`/gtn` = Pour lancer un Guess The Number.\n▫️`/premium` = Voir les avantage du mode premium de <@1067077813057888318>.\n▫️`/say` = Parler a la place du robot.\n▫️`/pfc` = Jouer au 1.2.3.. pierre, feuille, ciseaux.\n▫️`/avatar` = Avoir le lien de l\'avatar d\'un membre.\n▫️`/userinfo` = Savoir les information sur un utilisateur.\n▫️`/serverinfo` = Avoir les information sur un serveur Discord.' },
		{ name: '🤖 Bot Informations', value: '▫️`/botinfo` = Avoir les information du robot.\n▫️`/ping` = Voir la lattence du robot.', inline: true },
	)
	         .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: 'https://images-ext-2.discordapp.net/external/BkQyeJESTRCwjV3ioyV8MxMxqUHjeZro06cnx4aAByc/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1067077813057888318/f5a5085666b680e6eceb9ae49256ca15.webp' })  
                .setColor(`${config.colorEmbed}`)

            await interaction.deferUpdate()
            await interaction.editReply({embeds: [helpEmbed1, helpEmbed], components: [reloadInfo]})
            }
           
}
