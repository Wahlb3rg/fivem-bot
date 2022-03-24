const Discord = require("discord.js");
const bot = new Discord.Client();
const fivem = require("discord-fivem-api");
const botconfig = require('../botconfig.json');
const ip = botconfig.ip
const ipport = botconfig.ipport


module.exports.run = async (bot, message, args) => {
    message.delete();
fivem.getServerInfo(`${ip}:${ipport}`).then(server => {//149.56.107.241:30120
    let result  = [];
    let index = 1;
    for (let player of server.players) {
      result.push(`${index++}. ${infos.resources}\n`);//| ${player.id} ID
    }
    const påline = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor("Serveren er online")
      .setTitle(`Spillere (${server.players.length}/${server.infos.vars.sv_maxClients})`)
      .setDescription(result)
      .setTimestamp()
      .setFooter('Lavet af wahlberg#6270');
    message.channel.send(påline).then(msg => msg.delete({ timeout: 10000 }));;
  }).catch(err => {
    console.log(err).then(message.delete({ timeout: 100000 }));
    const ofline = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor("Serveren er offline")
    .setTimestamp()
    .setFooter('Lavet af wahlberg#6270');
  message.channel.send(ofline).then(msg => msg.delete({ timeout: 10000 }));
  })

}

module.exports.help = {
    name: "res"
}