const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    message.delete();
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    // let seconds = totalSeconds % 60; // Not added as there's not need for seconds.

    let uptimeEmbed = new Discord.MessageEmbed()
    .setDescription(`${bot.user.username} Bot Uptime`)
    .setColor("#e56b00")
    .addField("Hours", hours)
    .addField("Minutes", minutes)
    .setTimestamp()
    .setFooter(`Lavet af wahlberg#6270`)
    
    message.channel.send(uptimeEmbed).then(msg => msg.delete({ timeout: 10000 }))
}

module.exports.help = {
    name: "uptime" //NAVNET ER LIG MED KOMMANDOEN
}