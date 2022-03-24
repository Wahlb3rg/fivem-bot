const Discord = require("discord.js");
const bot = new Discord.Client();
const fivem = require("discord-fivem-api");
const botconfig = require('../botconfig.json');
const ip = botconfig.ip
const ipport = botconfig.ipport


module.exports.run = async (bot, message, args) => {
    message.delete();

 //               let statusEmbed = new Discord.MessageEmbed() 
 //           .setColor("#d42c20") // sætter farven for embed
 //           .setDescription(`**Ip:**\n\´\´\´connect cfx.re/join/e8krrd\´\´\´`) // tilføjer et felt med ip og port
 //           .addField("**Online:**", `${data.clients}/${data.maxclients}`) // laver felt med hvor mange personer der er i byen
 //           .addField("**Server name:**", `${data.hostname}`) // serverens navn i server listen.
 //           .setThumbnail('https://cdn.discordapp.com/attachments/793220733123428352/797254425956712478/giphy_7.gif')
 //           .setFooter('@2021 Québec City RolePlay')
 //           message.channel.send(statusEmbed).then(msg => msg.delete(300000));
    
 fivem.getServerInfo(`${ip}:${ipport}`).then(server => {//149.56.107.241:30120
    let result  = [];
    let index = 1;
    for (let player of server.players) {
      result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
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
    name: "status"
}