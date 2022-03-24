const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
        //!kick @user reason
        
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];

	if(!message.guild.roles.cache.find(role => role.name === "Staff")) return message.reply("Du har ikke tilladelse til at bruge denne kommando.");
        let kUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.reply("Kunne ikke finde personen!");
        let kReason = args.join(" ").slice(22);
        if (!kReason) return message.reply("Du skal angive en grund for kicket.");
        if(kUser.roles.cache.find(role => role.name === "Staff")) return message.channel.send("Denne person kan ikke blive kicked!");
        

        let kickMessageEmbed = new Discord.MessageEmbed()
        .setDescription(`Kicked fra: **${message.guild.name}** af ${message.author}`)
        .setColor("#e56b00")
        .addField("Grund: ", kReason);

        kUser.send(kickMessageEmbed).then(()=>
        kUser.kick(kReason)).catch(err => console.log(err))
        
        

        let kickEmbed = new Discord.MessageEmbed()
        .setDescription("Kick")
        .setColor("#e56b00")
        .addField("Kicked bruger:", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked af:", `<@${message.author.id}> with ID ${message.author.id}` )
        .addField("Kicked i:", message.channel)
        .addField("Grund", kReason);

        let kickChannel = bot.channels.cache.get(botconfig.log);
        if(!kickChannel) return message.channel.send("Kunne ikke finde log kanalen...");

        
        //message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        

        return;
    
}

module.exports.help = {
    name: "kick"
}