const Discord = require("discord.js")
const config = require("../config.js")
const welcomeSchema = require("../schemas/Welcome")

module.exports = async(bot, member) => {

        /* Welcome (mongodb) */
        
        welcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                return
            } else if (data) {
                let messageWelcome
                try {
                    messageWelcome = data.text
                        .replace(/${user}/g, member)
                        .replace(/${user.tag}/g, member.tag)
                        .replace(/${server}/g, member.guild.name)
                        .replace(/${user.id}/g, member.id)
                        .replace(/${membercount}/g, member.guild.memberCount)
                } catch { }
                const defaultMessage = `Hey ${member}, welcome to ${member.guild.name}`;
                const channelSend = bot.channels.cache.get(data.channelId);

                let assignedRole = member.guild.roles.cache.get(data.role);

                try { await member.roles.add(assignedRole) } catch { }

                const Imageembed = new Discord.EmbedBuilder()
                    .setImage("https://media.discordapp.net/attachments/1070999143629197384/1074265573556490311/Premium_18.png")
                    .setColor(`${config.colorEmbed}`)
                
                const embed = new Discord.EmbedBuilder()
                    .setDescription(messageWelcome == null ? defaultMessage : messageWelcome)
                    .setColor(`${config.colorEmbed}`)
                    .setFooter({ text: 'Notre objectif et de vous accompagner dans la protection de votre serveur Discord 😊', iconURL: bot.user.displayAvatarURL({dynamic: true})})

                channelSend.send({ embeds: [Imageembed, embed], ephemeral: true })
            }
        })
        
        /* ---- */
        
        /* Antiraid / Captcha (mysql) */
        
        let db = bot.db;
        
        db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {
        
               if(req.length < 1) return;
               
               if(req[0].antiraid === "true") {
               
                   try {await member.user.send("Vous ne pouvais pas rejoindre le serveur, car il et actuellement en mode antiraid.")} catch(err) {}
                   await member.kick("Antiraid activé.")
               }
               
               if(req[0].captcha === "false") return;
               
               let channel = member.guild.channels.cache.get(req[0].captcha)
               if(!channel) return;
               
               await channel.permissionOverwrites.create(member.user, {
                      SendMessages: true,
                      ViewChannel: true,
                      ReadMessageHistory: true
               })
               
               let captcha = await bot.function.generateCaptcha()
               
               let msg = await channel.send({content: `${member}, vous avez 2 minutes pour compléter le captcha ! Si vous ne le réussissez pas, vous serez exclu du serveur !`, files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: " captcha.png"})]})
               
               try {
               
                     let filter = m => m.author.id === member.user.id;
                     let response = (await channel.awaitMessages({filter, max: 1, time: 120000, errors: ["time"]})).first()
                     
                     if(response.content === captcha.text) {
                     
                          await msg.delete()
                          await response.delete()
                          try {await member.user.send("Vous avez réussi le captcha.")} catch (err) {}
                          await channel.permissionOverwrites.delete(member. user.id)
                     
                     } else {
                     
                          await msg.delete()
                          await response.delete()
                          try {await member.user.send("Vous avez échoué le captcha.")} catch (err) {}
                          await channel.permissionOverwrites.delete(member. user.id)
                          await member.kick("Mauvais code fournit pour le système de captcha.")
                     }
               
               } catch (err) {
               
                    await msg.delete()
                    try {await member.user.send("Vous avez mis trop de temps pour compléter le captcha.")} catch (err) {}
                    await channel.permissionOverwrites.delete(member. user.id)
                    await member.kick("Na pas compléter le captcha.")
                    
               }      
        })
        
        /* ---- */
}