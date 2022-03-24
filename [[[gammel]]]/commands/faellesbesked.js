const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    
    let tingting = args.slice(0).join(" ");
        if (!tingting) return message.channel.send(`Du skal lige huske at skrvie noget`)
    
    
    if (!message.channels.cache.get(botconfig.clogAdSkriveKanal)) return message.channel.send(`Nej`);
    
        var beskeden = message.content.toString();
        var d = new Date();
        console.log(d.toLocaleDateString());
    
        var besked = new Discord.MessageEmbed()
        .setTitle(`**NYHED D.** ${d.toLocaleDateString()} `)
        .setDescription(tingting)// beskeden
        .setFooter('Botten er lavet af Wahlberg')
        .setTimestamp()
        //.setThumbnail('./americanstate.png')
        .setColor(0xff0000)
        
        bot.channels.cache.get(botconfig.announcement).send(besked)
    

}

module.exports.help = {
    name: "nyhed" //NAVNET ER LIG MED KOMMANDOEN
}