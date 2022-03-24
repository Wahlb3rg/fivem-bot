const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
    message.delete();
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    // let seconds = totalSeconds % 60; // Not added as there's not need for seconds.

    let uptimeEmbed = new MessageEmbed()
    .setTitle(`${client.user.username} Bot Uptime`)
    .setColor("#e56b00")
    .setDescription(`Timer: ${hours}\nMinutter: ${minutes}`)
    .setTimestamp()
    .setFooter({ text: `Lavet af wahlberg#6270`})
    
    message.channel.send({ embeds: [uptimeEmbed] })//.then(msg => msg.delete({ timeout: 10000 }))
}

module.exports.help = {
    name: "uptime" //NAVNET ER LIG MED KOMMANDOEN
}