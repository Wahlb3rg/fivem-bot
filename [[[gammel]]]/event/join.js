const Discord = require("discord.js");
const botconfig = require('../botconfig.json');

module.exports = function (bot) {
console.log('guildmemberadd')
console.log(`--------------------------`);

bot.on('guildMemberAdd', async member =>{

        const channel = bot.channels.cache.get(botconfig.joinkanalID);
        let myGuild = bot.guilds.cache.get(botconfig.serverID);
        let memberCount = myGuild.memberCount;
        if(!channel) return;
    
        let hejbesked = new Discord.MessageEmbed()
        .setTitle('Velkommen til **Colorado**')
        .setDescription(`Hej ${member} og Velkommen til vore discord. \nHusk at læse vores regler. <#906218363963977808>\n\nDu er nummer: ${memberCount}`)
        
        //.setColor(0x2f3136)
        
        channel.send(hejbesked)
        // Der er ingen rolle for denne gang
        //member.roles.add(myGuild.roles.cache.get(botconfig.joinroleID));
        console.log(`${member} Joinede serveren`)
    });

bot.on('guildMemberRemove', async member =>{
    const channel = bot.channels.cache.get(botconfig.log);
    channel.send(`${member} forlod discorden`)
});

}