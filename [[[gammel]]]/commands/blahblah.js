const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
 
    var besked = new Discord.MessageEmbed()
    .setTitle(`Dette er en title`)
    .setFooter('Lorem ipsum dolor sit amet consectetur adipisicing elit. \nIpsam, possimus nobis. Illo nemo asperiores et cupiditate, iste assumenda dolorem, perferendis suscipit sequi ducimus error beatae blanditiis eaque labore quibusdam. Fuga!')
    .setThumbnail('https://cdn.discordapp.com/attachments/511116066831990805/845406563920904219/unknown.png')
    .addField('se her', 'her er der mer')
    //.setThumbnail('./americanstate.png')
    .setColor(0xff0000)
    
    message.channel.send(besked)

}
module.exports.help = {
    name: "ssssssssssssss"
}
