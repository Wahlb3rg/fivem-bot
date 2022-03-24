const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    //!ban @user reason
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.reply("Kunne ikke finde person!");
    let bReason = args.join(" ").slice(22);
    if (!bReason) return message.reply("Du skal angive en grund til bannet.");
    if(!message.guild.roles.cache.find(role => role.name === "Staff")) return message.reply("Du har ikke tilladelse til at bruge denne kommando.");
    if(bUser.roles.cache.find(role => role.name === "Staff")) return message.channel.send("Denne person kan ikke blive bannet.");

    
    let banMessageEmbed = new Discord.MessageEmbed()
    .setDescription(`Banned fra: **${message.guild.name}**`)
    .setColor("#e56b00")
    .addField("Grund: ", bReason);

    bUser.send(banMessageEmbed).then(()=>
//    kUser.send(`Du er blevet blevet kicket fra ` + message.guild.name + ` med grunden ` + kReason).then(() =>
    bUser.ban(bReason)).catch(err => console.log(err))


    let banEmbed = new Discord.MessageEmbed()
    .setDescription("Ban")
    .setColor("#e56b00")
    .addField("Banned:", `${bUser} med ID ${bUser.id}`)
    .addField("Banned af:", `<@${message.author.id}> med ID ${message.author.id}` )
    .addField("Banned i:", message.channel)
    .addField("At:", message.createdAt)
    .addField("Grund", bReason);

    let banChannel = bot.channels.cache.get(botconfig.log);
    if(!banChannel) return message.channel.send("Could not find the logs channel..");

    banChannel.send(banEmbed);

    return;
}

module.exports.help = {
    name: "ban"
}