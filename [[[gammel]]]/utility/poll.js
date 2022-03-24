const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
   
    
        message.delete();
        let question = args.slice(0).join(" ");
    
//        if(!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
        if (args.length === 0)
        return message.reply('**Ugyldigt format:** `!poll og det der skal være poll om`')
    
        const embed = new Discord.MessageEmbed()
        .setTitle("Hvad skal der ske!")
        .setColor("#2186ba")
        .setDescription(`${question}`)
        .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL()}`)
      
        message.channel.send({embed}).then( (message) => {
            message.react('👍')
            .then(() => message.react('👎'))
        });

}

module.exports.help = {
    name: "poll" //NAVNET ER LIG MED KOMMANDOEN
}