const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
 

        let Embed = new Discord.MessageEmbed()
    .setColor(0xFFFF00)
    .setTitle('Ip til vores server!')
    .setDescription(`Server:\`\`\`connect IP HER\`\`\``)//Teamspeak:\`\`\`94.130.237.93\`\`\`
    //.addField('**Server #1:**', 'Kommer snart')
    //.addField('**TeamSpeak**', 'Kommer snart')
    .setFooter('Lavet af wahlberg#6270')
    .setTimestamp()

message.channel.send(Embed)//.then(msg => msg.delete({ timeout: 8000 }))

}
module.exports.help = {
    name: "ip",
    name2: "IP"
}

