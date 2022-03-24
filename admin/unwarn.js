const fs = require("fs");
const { MessageEmbed } = require("discord.js");
//const ms = require("ms");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    if(!message.guild.roles.cache.find(role => role.name === "Staff")) return message.channel.send("Du har ikke rank til dette.").then(msg => msg.delete({ timeout: 10000 }))
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Du skal skrive en bruger.").then(msg => msg.delete({ timeout: 5000 }))

    warns[wUser.id].warns--;

    fs.writeFile("warnings.json", JSON.stringify(warns, null, 4), (err) => {
        if (err) console.log(err)
    });


    const warnEmbed = new MessageEmbed()
        .setDescription("Personens `Warning(s)` er blevet fjernet ")
        .setColor(0x00ff00)
        .addField("Fjernet af ", `${message.author} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("User", `${wUser} - Hash: ${wUser.user.tag} - ID: ${wUser.id}`)
        //.addField("Removed In", `${message.channel} - ID: ${message.channel.id}`)
        .addField("Det nye antal af advarlser er", warns[wUser.id].warns);

    let warnchannel = message.guild.channels.cache.find(channel => channel.id === botconfig.log);
    if(!warnchannel) return console.log("Channel not found (Config: 'warning_logs_channel')");

    warnchannel.send({ embeds: [warnEmbed] });
    message.channel.send(`<@${wUser.id}> har fjernet 1 advarsel.`);
}

module.exports.help = {
    name: "unwarn"
}