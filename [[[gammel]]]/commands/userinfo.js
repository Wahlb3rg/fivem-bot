const Discord = require("discord.js");
const fs = require("fs");
//const botconfig = require("./botconfig.json");


module.exports.run = async (bot, message, args) => {
    message.delete();
    //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete({ timeout: 10000 }))

    let warns = JSON.parse(fs.readFileSync("warnings.json", "utf8"));
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        if(!warns[user.id]) warns[user.id] = {
            warns: 0
        };
        
        const member = message.guild.member(user);
        let warnlevel = warns[user.id].warns;
        
        function farve() {
            var rand = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        
            return rand[Math.floor(Math.random()*rand.length)];
        }

        //Discord rich embed
        let UserInfoEmbed = new Discord.MessageEmbed()
            UserInfoEmbed.setColor('#' + farve() + farve() + farve() + farve() + farve() + farve())
            UserInfoEmbed.setAuthor(`${user.username}\'s User Information`, user.avatarURL())
            UserInfoEmbed.addField("Name:", `${user.toString()}`, true)
            UserInfoEmbed.addField(`Name Hash:`, `${user.username}#${user.discriminator}`, true)
            UserInfoEmbed.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)

            UserInfoEmbed.addField("Created Account At:", `${user.createdAt.toLocaleString()}`, true)
            UserInfoEmbed.addField("Joined Server At:", `${member.joinedAt.toLocaleString()}`, true)
            UserInfoEmbed.addField("ID:", `${user.id}`, true)

            UserInfoEmbed.addField("Status:", `${user.presence.status}`, true)
            UserInfoEmbed.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
            UserInfoEmbed.addField("Highest Role:", member.highestRole, true)

            UserInfoEmbed.addField('\u200B', '\u200B')

            UserInfoEmbed.addField("Warning Count:", `${warnlevel}`, true)

            if(message.author.avatarURL()) {
                UserInfoEmbed.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL()}`)
            } else {
                UserInfoEmbed.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
            }

        message.channel.send(UserInfoEmbed)//.then(msg => msg.delete({ timeout: 60000 })) 
}

module.exports.help = {
    name: "userinfo"
}