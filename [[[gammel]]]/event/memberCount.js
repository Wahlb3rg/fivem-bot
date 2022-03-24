const Discord = require("discord.js");
const clientconfig = require('../clientconfig.json');

module.exports = function (client) {
console.log('member counter')
console.log(`--------------------------`);

//client.on('ready',() =>{ 
//    let myGuild = client.guilds.cache.get(clientconfig.serverID);
//    let memberCount = myGuild.memberCount;
//    const channel = myGuild.channels.cache.get(clientconfig.memberchannelID);
//    channel.setName(`Medlemer: ${memberCount.toLocaleString()}`)
//})
//
//client.on('guildMemberAdd',() =>{
//    let myGuild = client.guilds.cache.get(clientconfig.serverID);
//    let memberCount = myGuild.memberCount;
//    const channel = myGuild.channels.cache.get(clientconfig.memberchannelID);
//    channel.setName(`Medlemer: ${memberCount.toLocaleString()}`)
//})
//
//client.on('guildMemberRemove',() =>{
//    let myGuild = client.guilds.cache.get(clientconfig.serverID);
//    let memberCount = myGuild.memberCount;
//    const channel = myGuild.channels.cache.get(clientconfig.memberchannelID);
//    channel.setName(`Medlemer: ${memberCount.toLocaleString()}`)
//})

let myGuild = client.guilds.get(clientconfig.serverID);
let memberCount = myGuild.memberCount;
let memberCountChannel = myGuild.channels.get(clientconfig.memberchannelID);
memberCountChannel.setName("Member•" +memberCount+ "•User")

};