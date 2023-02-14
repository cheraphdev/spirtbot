const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js')
const config = require("../config.js")

module.exports = {

   name: "ticket",
   description: "⚙️ Configurer le système de ticket.",
   permission: Discord.PermissionFlagsBits.ManageGuild,
   ownerOnly: false,
   premiumOnly: false,
   dm: false,
   options: [
          {
                 type: "channel",
                 name: "channel",
                 description: "📩 Salon d'envoie de l'embed du panel de ticket.",
                 required: true,
          }
   ],
        
        async run(bot, interaction) {
        
                const channel = interaction.guild.channels.cache.get(interaction.options.get('channel')?.value || interaction.channel.id);

        if(!channel) return interaction.reply({
            content: `Salon introuvable !`,
            ephemeral: true
        });
        
        const ImageembedMain = new EmbedBuilder()
            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071564769787658291/Premium_8.png")
            .setColor(`${config.colorEmbed}`);

        const embedMain = new EmbedBuilder()
            .setTitle("<:edit:1071563254834397277> Personnalisé l'embed du système de ticket")
            .setDescription("Vous pouvez modifier l'embed du système de ticket a votre guise 🤩\n\n⚠️ **Le système et nouveau, il peut y avoir des bug !**")
            .setColor(`${config.colorEmbed}`);
            
        let ImageembedToEdit = new EmbedBuilder()
           .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071520832851034233/Premium_7.png")
           .setColor(`${config.colorEmbed}`);

        let embedToEdit = new EmbedBuilder()
           .setDescription("Personnalise moi avec le menu deroulent qui est juste en dessous !");
            
        let btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
           .setCustomId("ticket")
           .setLabel("Ouvrir une demande de support")
           .setStyle(Discord.ButtonStyle.Primary)
           .setEmoji("<:info:1071521506573701120>"))

        interaction.reply({
            embeds: [
                ImageembedMain,
                embedMain,
                embedToEdit
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('embed_builder')
                        .setPlaceholder('📝 Modifie moi.')
                        .addOptions(
                            {
                                label: "Titre de l'embed.",
                                emoji: "1️⃣",
                                value: "title"
                            },
                            {
                                label: "Description de l'embed.",
                                emoji: "2️⃣",
                                value: "desc"
                            },
                            {
                                label: "Footer de l'embed.",
                                emoji: "3️⃣",
                                value: "footer"
                            },
                            {
                                label: "Couleur de l'embed.",
                                emoji: "4️⃣", 
                                value: "color"
                            }
                        )
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('embed_creator_save')
                        .setLabel('Envoyer')
                        .setEmoji('<:validate:1071571218316152892>')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_end')
                        .setLabel('Annuler / Supprimer')
                        .setEmoji('<:close:1071523654573236285>')
                        .setStyle(ButtonStyle.Danger),
                )
            ],
        });

        const collectorMENU = interaction.channel.createMessageComponentCollector({
            type: ComponentType.StringSelect,
            filter: i => i.user.id === interaction.user.id
        });

        collectorMENU.on('collect', async (i) => {
            if (!i.values) return;

            const ID = i.values[0];

            // Title:
            if (ID === "title") {
            
            let ImageTitle = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071575447634190377/Premium_9.png")
                            .setColor(`${config.colorEmbed}`)
            
                i.reply({
                    embeds: [
                        ImageTitle,
                        
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le contenu qui devrait figurer dans le titre de l\'embed.')
                            .setColor(`${config.colorEmbed}`)
                            .setFooter({
                                text: "Envoie \"annuler\" pour annuler cette interaction."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "annuler") {
                    
                    let AnnulerTitle = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071577187121111060/Premium_10.png")
                            .setColor(`${config.colorEmbed}`)
                    
                        return i.editReply({
                            embeds: [
                               AnnulerTitle,
                                   
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor(`${config.colorEmbed}`)
                            ]
                        });
                    };

                    embedToEdit.setTitle(message);

                    i.editReply({
                        content: `\`title\` a bien été modifier.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [ImageembedMain, embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Description:
            if (ID === "desc") {
            
            let ImageDescription = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071578651184873523/Premium_11.png")
                            .setColor(`${config.colorEmbed}`)
            
                i.reply({
                    embeds: [
                    ImageDescription,
                    
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le contenu qui devrait figurer dans la description de l\'embed.')
                            .setColor(`${config.colorEmbed}`)
                            .setFooter({
                                text: "Envoie \"annuler\" pour annuler cette interaction."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 4096);

                    if (message === "annuler") {
                    
                    let AnnulerDescription = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071577187121111060/Premium_10.png")
                            .setColor(`${config.colorEmbed}`)
                    
                        return i.editReply({
                            embeds: [
                            AnnulerDescription,
                            
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor(`${config.colorEmbed}`)
                            ]
                        });
                    };

                    embedToEdit.setDescription(message);

                    i.editReply({
                        content: `\`description\` a été modifer.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [ImageembedMain, embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Footer:
            if (ID === "footer") {
            
            let ImageFooter = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071579240765599795/Premium_12.png")
                            .setColor(`${config.colorEmbed}`)
            
                i.reply({
                    embeds: [
                    ImageFooter,
                    
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le contenu qui devrait figurer dans le footer de l\'embed.')
                            .setColor(`${config.colorEmbed}`)
                            .setFooter({
                                text: "Envoie \"annuler\" pour annuler cette interaction."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 2048);

                    if (message === "annuler") {
                    
                    let AnnulerFooter = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071577187121111060/Premium_10.png")
                            .setColor(`${config.colorEmbed}`)
                    
                        return i.editReply({
                            embeds: [
                            AnnulerFooter,
                            
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor(`${config.colorEmbed}`)
                            ]
                        });
                    };

                    embedToEdit.setFooter({ text: message });

                    i.editReply({
                        content: `\`footer#text\` a bien été modifer.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [ImageembedMain, embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Color:
            if (ID === "color") {
            
            let ImageColor = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071579711894982676/Premium_13.png")
                            .setColor(`${config.colorEmbed}`)
            
                i.reply({
                    embeds: [
                    ImageColor,
                    
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le nom de la couleur ou le code HEX qui doit figurer dans l\'intégration de couleur de l\'embed.')
                            .setFooter({
                                text: "Envoie \"annuler\" pour annuler cette interaction.\nRemarque : Pour l'API Discord, vous devez fournir des couleurs telles que \"Blue\", \"Red\"... etc. Le nom de la couleur commence toujours par une lettre majuscule."
                            })
                            .setColor(`${config.colorEmbed}`)
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "annuler") {
                    
                    let AnnulerColor = new EmbedBuilder()
                            .setImage("https://media.discordapp.net/attachments/1070999143629197384/1071577187121111060/Premium_10.png")
                            .setColor(`${config.colorEmbed}`)
                    
                        return i.editReply({
                            embeds: [
                            AnnulerColor,
                            
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor(`${config.colorEmbed}`)
                            ]
                        });
                    };

                    try {
                        embedToEdit.setColor(message);
                    } catch (e) {
                        embedToEdit.setColor('Default');
                    };

                    i.editReply({
                        content: `\`color\` a bien été modifier.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [ImageembedMain, embedMain, embedToEdit] }).catch(() => { });
                });
            };
        });

        const collectorBUTTONS = interaction.channel.createMessageComponentCollector({
            type: ComponentType.Button,
            filter: i => i.user.id === interaction.user.id
        });

        collectorBUTTONS.on('collect', async (i) => {
            const ID = i.customId;

            if (ID === "embed_creator_save") {
                channel.send({
                    embeds: [
                        ImageembedToEdit,
                        embedToEdit
                    ],
                    components: [
                    btn
                    ]
                 
                }).catch(() => { });

                await i.reply({
                    content: `Envoyer ! Regarde dans le salon ${channel}.`,
                    ephemeral: true
                }).catch(() => { });

                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };


            if (ID === "embed_creator_end") {
                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };

            
        });

    },
        
}