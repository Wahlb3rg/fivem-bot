const fs = require("fs");
const { MessageEmbed } = require("discord.js");
//const ms = require("ms");
const botconfig = require("../botconfig.json");

module.exports.run = async (client, message, args, member) => {
    message.delete();
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

    if (message.guild.roles.cache.find(role => role.name === "Staff")) {

        let wUser = message.mentions.members.first()
        if (!wUser) return message.channel.send(`Du skal @tag en bruger`);//message.lineReply("Du skal @tag en bruger")
        //if(wUser.roles.cache.some(role => role.name === 'Ejer')) return message.reply("Denne person kan ikke modtage advarlser.").then(msg => msg.delete({ timeout: 5000 }))
        //permissions.has([Permissions.FLAGS.ADMINISTRATOR])

        let reason = args.join(" ").slice(22);

        if (!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

        if (!reason) {
            reason = "Der er ikke blevet angivet en grund.";
        }

        warns[wUser.id].warns++;

        fs.writeFile("warnings.json", JSON.stringify(warns, null, 4), (err) => {
            if (err) console.log(err)
        });

        let warnEmbed = new MessageEmbed()
            .setDescription("User Warning")
            .setAuthor({ name: message.author.username })
            .setColor("#fc6400")
            .addFields(
                { name: 'Advaret af', value: `${message.author} - Hash: ${message.author.tag} - ID: ${message.author.id}` },
                { name: 'Brugeren', value: `${wUser} - Hash: ${wUser.user.tag} - ID: ${wUser.id}` },
                { name: 'Fik advarslen i', value: `${message.channel} - ID: ${message.channel.id}` },
                { name: 'Grundlag', value: `${reason}` },
                { name: 'Antal advarsler', value: `${warns[wUser.id].warns}` },
                //{ name: '\u200B', value: '\u200B' },
            )

        let warnChannel = message.guild.channels.cache.find(channel => channel.id === botconfig.log);
        if (!warnChannel) return console.log("Channel not found (Config: 'warning_logs_channel')");

        warnChannel.send({ embeds: [warnEmbed] });

        if (warns[wUser.id].warns <= 1) {
            message.channel.send(`<@${wUser.id}> har fået en advarsel`);
        }

        ////////////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////////////////////////
        /*
                let muteRole = message.guild.roles.find(role => role.name === botconfig["moderation_module"].mute_role);
                if (!muteRole) return console.log("Role not found (Config: 'mute_role')");
        
                ///////////////////////////////////////
                    if(warns[wUser.id].warns == 2){
                        await(wUser.addRole(muteRole.id));
                        message.channel.send(`<@${wUser.id}> has been warned for: ${reason}. <@${wUser.id}> muted for 2 mins`);
                
                        setTimeout(function(){
                            wUser.removeRole(muteRole.id)
                            message.channel.send(`<@${wUser.id}> has been unmuted.`)
                        }, ms('2m'))
                    }
        
                ///////////////////////////////////////
                    if(warns[wUser.id].warns == 3){
                        await(wUser.addRole(muteRole.id));
                        message.channel.send(`<@${wUser.id}> has been warned for: ${reason}. <@${wUser.id}> muted for 2 hours`);
        
                        setTimeout(function(){
                            wUser.removeRole(muteRole.id)
                            message.channel.send(`<@${wUser.id}> has been unmuted.`)
                        }, ms('2h'))
                    }
        
                ///////////////////////////////////////
                    if(warns[wUser.id].warns == 4){
                        await(wUser.addRole(muteRole.id));
                        message.channel.send(`<@${wUser.id}> has been warned for: ${reason}. <@${wUser.id}> muted for 4 hours`);
        
                        setTimeout(function(){
                            wUser.removeRole(muteRole.id)
                            message.channel.send(`<@${wUser.id}> has been unmuted.`)
                        }, ms('4h'))
                    }
        
                ///////////////////////////////////////
                if (warns[wUser.id].warns >= 5) {
        
                    let bwarnEmbed = new MessageEmbed()
                        .setDescription("User Warning")
                        .setAuthor(message.author.username)
                        .setColor("#fc6400")
                        .addField("Advaret af", `${message.author} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
                        .addField("Brugeren", `${wUser} - Hash: ${wUser.user.tag} - ID: ${wUser.id}`)
                        .addField("Fik advarslen i", `${message.channel} - ID: ${message.channel.id}`)
                        .addField("Grundlag", reason)
                        .addField("Antal advarsler", "**DENNE BRUGER ER BLEVET BANNET**");
        
                    wUser.ban(reason)
        
                    warnChannel.send({ embeds: [bwarnEmbed] });
                }*/

        if (warns[wUser.id].warn >= 50) {
            try {
                await wUser.send(`**Notification** Det her er en notification på du er blevet advaret i '${message.guild.name}' grund(e): ${reason}`)
            } catch (e) {
                // console.log(e.stack);
                console.log('\x1b[33m%s\x1b[0m', "I tried to DM a new user, but their DM's are locked.");
            }
        }


    } else { message.channel.send("Hov hov det må du vist ikke") }//.then(msg => msg.delete({ timeout: 10000 }));
}

module.exports.help = {
    name: "warn"
}