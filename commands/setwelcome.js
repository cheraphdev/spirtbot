const Discord = require("discord.js")
const config = require("../config")
const { PermissionFlagsBits } = require('discord.js')
const welcomeSchema = require("../schemas/Welcome")
const {model, Schema} = require("mongoose")

module.exports = {

    name: "setwelcome",
    description: "⚙️ Configurer le système de bienvenue.",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    ownerOnly: true,
    premiumOnly: false,
    dm: false,
    options: [
        {
            type: "channel",
            name: "channel",
            description: "⚙️ Salon ou le bot vas souhaitez la bienvenue au nouveaux utilisateur.",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "welcome-message",
            description: "📝 Message personnalisé. [Tag: {user} | {server} | {user.tag} | {user.id} | {membercount}]",
            required: true,
            autocomplete: false
        }
        /*{
            type: "role",
            name: "welcome_role",
            description: "🧭 Rôle que le bot donnera a l'arriver de l'utilisateur.",
            required: false,
            autocomplete: false
        }*/
    ],

    async run(bot, interaction, message, args) {
        const { channel, options } = interaction;

        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("welcome-message");
        //const roleId = options.getRole("welcome-role");

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({ content: "I don't have permissions for this.", ephemeral: true });
        }

        welcomeSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
                    //Role: roleId.id
                });
            }
            interaction.reply({ content: 'Succesfully created a welcome message', ephemeral: true });
        })
    }
}