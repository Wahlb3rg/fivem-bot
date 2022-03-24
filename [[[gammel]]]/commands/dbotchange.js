const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    
//    message.delete();

    let tingting = args.slice(0).join(" ");
//    if (!message.channels.cache.fetch('816224460062720030')) return message.channel.send(`Nej`).then(msg => msg.delete({ timeout: 15000 }))
    if (!tingting) return message.channel.send(`Du skal lige huske at skrvie noget`)


	if (!message.channels.cache.get(botconfig.clogAdSkriveKanal)) return message.channel.send(`Nej`);

    var beskeden = message.content.toString();
    var d = new Date();
    //console.log(d.toLocaleTimeString());
    //console.log(d.toLocaleString());
    console.log(d.toLocaleDateString());

    var besked = new Discord.MessageEmbed()
    .setTitle(`**DISCORD BOT CHANGE LOG D.** ${d.toLocaleDateString()} `)
    .setDescription(tingting)// beskeden
    .setFooter('Botten er lavet af Wahlberg\nAlle scripts er lavet eller modificeret af wahlberg')
    .setTimestamp()
    //.setThumbnail('./americanstate.png')
    .setColor(0x00ff00)
    
    bot.channels.cache.get(botconfig.clog).send(besked)

}


module.exports.help = {
    name: "dblog" 
}