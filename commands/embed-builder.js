const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js')
const config = require("../config.js")

module.exports = {

   name: "embed-builder",
   description: "📰 Crée un embed.",
   permission: Discord.PermissionFlagsBits.Administrator,
   ownerOnly: false,
   premiumOnly: true,
   dm: false,
   options: [
          {
                 type: "channel",
                 name: "channel",
                 description: "🔗 Salon d'envoye du embed.",
                 required: false,
          }
   ],
        
        async run(bot, interaction) {
        
                const channel = interaction.guild.channels.cache.get(interaction.options.get('channel')?.value || interaction.channel.id);

        if(!channel) return interaction.reply({
            content: `\`❌\` Invalid channel.`,
            ephemeral: true
        });

        const embedMain = new EmbedBuilder()
            .setTitle('Embed Builder')
            .setDescription('Sélectionnez une option de construction d\'embed dans le menu de sélection ci-dessous pour modifier l\'embed.')
            .setColor("#2f3136");

        let embedToEdit = new EmbedBuilder()
            .setDescription('Modifie moi !');

        interaction.reply({
            embeds: [
                embedMain,
                embedToEdit
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('embed_builder')
                        .setPlaceholder('Rien de sélectionné.')
                        .addOptions(
                            {
                                label: "Embed Author",
                                value: "author"
                            },
                            {
                                label: "Embed Title",
                                value: "title"
                            },
                            {
                                label: "Embed Description",
                                value: "desc"
                            },
                            {
                                label: "Embed Footer",
                                value: "footer"
                            },
                            {
                                label: "Embed Color",
                                value: "color"
                            },
                            {
                                label: "Embed Image",
                                value: "image"
                            },
                            {
                                label: "Embed Thumbnail",
                                value: "thumbnail"
                            }
                        )
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('embed_creator_save')
                        .setLabel('Envoyer')
                        .setEmoji('📨')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_restart')
                        .setLabel('Rebuild')
                        .setEmoji('🔁')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_end')
                        .setLabel('Stop')
                        .setEmoji('🛑')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_help')
                        .setLabel('Aide')
                        .setEmoji('ℹ️')
                        .setStyle(ButtonStyle.Primary),
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

            // Author:
            if (ID === "author") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le contenu qui devrait figurer dans l\'auteur de l\'embed.')
                            .setColor("#2f3136")
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
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor("#2f3136")
                            ]
                        });
                    };

                    embedToEdit.setAuthor({ name: message });

                    i.editReply({
                        content: `\`author\` a bien été modifier.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Title:
            if (ID === "title") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le contenu qui devrait figurer dans le titre intégré.')
                            .setColor("#2f3136")
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
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor("#2f3136")
                            ]
                        });
                    };

                    embedToEdit.setTitle(message);

                    i.editReply({
                        content: `\`title\` a bien été modifier.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Description:
            if (ID === "desc") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le contenu qui devrait figurer dans la description de l\'embed.')
                            .setColor("#2f3136")
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
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor("#2f3136")
                            ]
                        });
                    };

                    embedToEdit.setDescription(message);

                    i.editReply({
                        content: `\`description\` a été modifer.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Footer:
            if (ID === "footer") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le contenu qui devrait figurer dans le footer de l\'embed.')
                            .setColor("#2f3136")
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
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor("#2f3136")
                            ]
                        });
                    };

                    embedToEdit.setFooter({ text: message });

                    i.editReply({
                        content: `\`footer#text\` a bien été modifer.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Color:
            if (ID === "color") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Veuillez saisir dans ce salon le nom de la couleur ou le code HEX qui doit figurer dans l\'intégration de couleur de l\'embed.')
                            .setFooter({
                                text: "Envoie \"annuler\" pour annuler cette interaction.\nRemarque : Pour l'API Discord, vous devez fournir des couleurs telles que \"Blue\", \"Red\"... etc. Le nom de la couleur commence toujours par une lettre majuscule."
                            })
                            .setColor("#2f3136")
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
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor("#2f3136")
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

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Image:
            if (ID === "image") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Veuillez fournir une URL d\'image valide dans ce salon pour l\'image de l\'embed.')
                            .setFooter({
                                text: "Envoie \"annuler\" pour annuler cette interaction.\nRemarque : Assurez-vous que le lien commence par \"https://\" ! Sinon, il n'affichera rien."
                            })
                            .setColor("#2f3136")
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
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor("#2f3136")
                            ]
                        });
                    };

                    try {
                        embedToEdit.setImage(message);
                    } catch (e) {
                        embedToEdit.setImage(null);
                    };

                    i.editReply({
                        content: `\`image\` a bien été modifier.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Thumbnail:
            if (ID === "thumbnail") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Veuillez fournir une URL d\'image valide dans ce salon pour la miniature de l\'embed.')
                            .setFooter({
                                text: "Envoie \"annuler\" pour annuler cette interaction.\nRemarque : Assurez-vous que le lien commence par \"https://\" ! Sinon, il n'affichera rien."
                            })
                            .setColor("#2f3136")
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
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Annuler.')
                                    .setColor("#2f3136")
                            ]
                        });
                    };

                    try {
                        embedToEdit.setThumbnail(message);
                    } catch (e) {
                        embedToEdit.setThumbnail(null);
                    };

                    i.editReply({
                        content: `\`thumbnail\` a bien été modifier.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
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
                        embedToEdit
                    ]
                }).catch(() => { });

                await i.reply({
                    content: `Envoyer ! Regarde dans le salon ${channel}.`,
                    ephemeral: true
                }).catch(() => { });

                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };

            if (ID === "embed_creator_restart") {
                embedToEdit.setAuthor(null);
                embedToEdit.setTitle(null);
                embedToEdit.setDescription("Re modifie moi !");
                embedToEdit.setFooter(null);
                embedToEdit.setColor(null);

                i.reply({
                    content: `Embed reconstruit.`,
                    ephemeral: true
                }).catch(() => { });

                return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
            };

            if (ID === "embed_creator_end") {
                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };

            if (ID === "embed_creator_help") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Comment créer un embed message ?')
                            .setDescription(`Pour modifier le message de l\'embed, sélectionnez un choix pour dans le menu de sélection. Après avoir sélectionné, tapez n\'importe quoi dans le chat pour que je l\'enregistre dans l\'embed constructor.
                             Lisez les instructions donner lorsque vous avez sélectionné un choix.`)
                            .setColor("#2f3136")
                    ],
                    ephemeral: true
                }).catch(() => { });
            };
        });

    },
        
}