const { serverID, memberchannelID } = require('../botconfig.json');

module.exports = function (client) {
  console.log('member counter')
  console.log(`--------------------------`);

  function memberCount() {
    const myGuild = client.guilds.get(serverID);
    const memberCount = myGuild.memberCount;
    const channel = myGuild.channels.cache.get(memberchannelID)
    channel.setName(`Medlemer: ${memberCount.toLocaleString()}`)
  }

  client.on('ready',() =>{
    memberCount();
  })

  client.on('guildMemberAdd',() =>{
    memberCount();
  })

  client.on('guildMemberRemove',() =>{
    memberCount();
  })

};