const Discord = require("discord.js");
const ipc = require('../config/ipconfig.json');

module.exports.run = async (client, message, args) => {


    let Embed = new Discord.MessageEmbed()
        .setColor(0xFFFF00)
        .setTitle(ipc.titel)
        .setDescription(`Server:\`\`\`${ipc.publicIp}\`\`\``)//Teamspeak:\`\`\`94.130.237.93\`\`\`
        .setFooter({ text: 'Lavet af wahlberg#6270' })
        .setTimestamp()

    message.channel.send({ embeds: [Embed] })//.then(msg => msg.delete({ timeout: 8000 }))

}
module.exports.help = {
    name: "ip",
    name2: "IP"
}

