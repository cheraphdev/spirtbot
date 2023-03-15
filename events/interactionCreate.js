const Discord = require("discord.js")
const { TextInputStyle } = require("discord.js")
const premiumId = ["1056780751133224990", "986621867194474587"]
const BlackListFile = require("../config/blacklist.json")
const BlackList = BlackListFile.userID
const config = require("../config")
const economySchema = require("../schemas/Economy")

module.exports = async (bot, interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if (interaction.commandName === "setantiraid") {
            let choices = ["on", "off"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
        }
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        if (BlackList.indexOf(interaction.user.id) !== -1) {
            try {
                if (!interaction.isButton())
                    interaction.reply({ content: "*Oupss*.. Tu ne peux plus communiquer avec **SpirtBot** puisque tu es **blacklist**.", ephemeral: false })
                return;
            } catch (error) { };
        }
            let command = require(`../commands/${interaction.commandName}`)
            if (command.ownerOnly && !config.botinfo.ownerID.includes(interaction.user.id)) return interaction.reply('Seul le développeur du bot peut utiliser cette commande !');
            if (command.premiumOnly && !premiumId.includes(interaction.user.id)) return interaction.reply('Seul les premium du bot peut utiliser cette commande !');
            if (command.inDev) return interaction.reply('La comande est actuellement en développement !');
            command.run(bot, interaction, interaction.options, bot.db)
        }

    if (interaction.isButton()) {

        if (interaction.customId === "ticket") {

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
            await interaction.reply({ content: `Votre ticket a correctement été créé : ${channel}`, ephemeral: true })

            let ImageTicketCreateEmbed = new Discord.EmbedBuilder()
                .setColor(`${config.botinfo.colorEmbed}`)
                .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071520832851034233/Premium_7.png")

            let TicketCreateEmbed = new Discord.EmbedBuilder()
                .setColor(`${config.botinfo.colorEmbed}`)
                .setTitle("<:info:1071521506573701120> Demande de support")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription("Veuillez indiquer le motif de votre demande de support. Si cette demande était une erreur, appuyez sur le bouton ci-dessous.")
                .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            const closeButton = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
                .setCustomId("close")
                .setLabel("Annuler / Fermer le ticket")
                .setStyle(Discord.ButtonStyle.Danger)
                .setEmoji("<:close:1071523654573236285>"))

            await channel.send({ content: `<@${interaction.user.id}>`, embeds: [ImageTicketCreateEmbed, TicketCreateEmbed], components: [closeButton] })
        }

        if (interaction.customId === "close") {

            let user = bot.users.cache.get(interaction.channel.topic)
            try { await user.send(`Hey <@${interaction.user.id}>, Votre ticket sur le serveur ${interaction.guild.name} a été fermé.`) } catch (err) { }

            await interaction.channel.delete()
        }
    }

    //reload ping
    if (interaction.customId === "ping") {

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
        if (pingUser < 200) { emojiUser = "🟢" }
        else if (pingUser < 400 && pingUser > 200) { emojiUser = "🟠" }
        else if (pingUser > 400) { emojiUser = "🔴" };
        //Ping de l'api Discord
        const APIPing = bot.ws.ping;
        let APIemoji;
        if (APIPing < 200) { APIemoji = "🟢" }
        else if (APIPing < 400 && APIPing > 200) { APIemoji = "🟠" }
        else if (APIPing > 400) { APIemoji = "🔴" }

        let PingEmbed = new Discord.EmbedBuilder()
            .setDescription(`
                \`${emojiUser}\` Pong ! | Votre ping : **${pingUser}ms**
                \`${APIemoji}\` Pong ! | API Discord ping : **${APIPing}ms**`)
            .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setColor(`${config.botinfo.colorEmbed}`)

        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [PingEmbed], components: [reloadPing] })
    }

    //Economy system
    if (interaction.customId === "createAccount") {

        const DataCreateAccount = await economySchema
            .findOne({ Guild: interaction.guild.id })
            .catch((err) => { });
        if (!DataCreateAccount) {
            await economySchema
                .create({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Bank: 0,
                    Wallet: config.economyinfo.createAccount
                })
                .catch((err) => { });
        }

        //await DataCreateAccount.save();

        /*Data = new economySchema({
            Guild: interaction.guild.id,
            User: interaction.user.id,
            Bank: 0,
            Wallet: config.economyinfo.createAccount
        })
    
        await Data.save();*/

        /*const ImageCreateAccountEmbed = new Discord.EmbedBuilder()
            .setImage("")
            .setColor(config.botinfo.colorEmbed)*/

        const createAccountEmbed = new Discord.EmbedBuilder()
            .setDescription(`Hey ${interaction.user.username}, votre compte à bien été créer avec succès. Nous vous avons donner ${config.economyinfo.createAccount} pour bie débuter votre avanture !`)
            .setColor(`${config.botinfo.colorEmbed}`)

        await interaction.reply({ embeds: [createAccountEmbed], components: [], ephemeral: true });
    }

    if (interaction.customId === "deleteAccount") {

        const DataDeleteAccount = await economySchema
            .findOne({ Guild: interaction.guild.id })
            .catch((err) => { });
        if (!DataDeleteAccount) return;

        await DataDeleteAccount.delete();

        /*Data = new economySchema({
            Guild: null,
            User: null,
            Bank: null,
            Wallet: null
        })
    
        await Data.save();*/

        /*const ImageDeleteAccountEmbed = new Discord.EmbedBuilder()
            .setImage("")
            .setColor(config.botinfo.colorEmbed)*/

        const deleteAccountEmbed = new Discord.EmbedBuilder()
            .setDescription(`Hey ${interaction.user.username}, votre compte à bien été supprimer.`)
            .setColor(`${config.botinfo.colorEmbed}`)

        await interaction.reply({ embeds: [deleteAccountEmbed], components: [], ephemeral: true });
        //------

        if (interaction.customId === "bug-report") {

            let Modal = new Discord.ModalBuilder()
                .setCustomId('report')
                .setTitle('SpirtBot - Bug Report')

            let question1 = new Discord.TextInputBuilder()
                .setCustomId('bug')
                .setLabel("Qu'elle et le bug ?")
                .setRequired(true)
                .setPlaceholder('Indiquez la description ici')
                .setStyle(TextInputStyle.Paragraph)

            let ActionRow1 = new Discord.ActionRowBuilder().addComponents(question1);

            Modal.addComponents(ActionRow1)

            await message.showModal(Modal)

            try {

                let reponse = await message.awaitModalSubmit({ time: 300000 })

                let whatToSay = reponse.fields.getTextInputValue('saychat')

                const EmbedSay = new Discord.EmbedBuilder()
                    .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setColor(`${config.botinfo.colorEmbed}`)
                    .setDescription(`Votre texte s'est envoyé correctement.`)

                await message.channel.send({ content: whatToSay });

                await reponse.reply({ embeds: [EmbedSay], ephemeral: true })

            } catch (err) { return; }

        }

    }
}