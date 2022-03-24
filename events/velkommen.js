const vel = require("../config/velkommenconfig.json");
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports = function (client) {

    console.log('Velkommen')
    console.log('--------------------------')

    client.on('guildMemberAdd', async member =>{

        const channel = client.channels.cache.get(vel.velkommenKanalID);
        let myGuild = client.guilds.cache.get('825000372710932490');
        let memberCount = myGuild.memberCount;
        if(!channel) return console.log('Join kanalen kan ikke findes');
        
        let hejbesked = new Discord.MessageEmbed()
        .setTitle(`Velkommen til **${vel.servernavn}**`)
        .setDescription(`Hej ${member} og Velkommen til vores discord.\nHusk at læse vores regler <#826109165876936724>\n\nMedlem nummer: ${memberCount}`)
        .setColor(0x2f3136)

        channel.send({ content: `Hej ${member}`, embeds: [hejbesked] })
        
        if(member) {
            try{
                await member.send(`Besked fra staff teamet: ${ve.dmbesked}`)
            }catch(e){
                //console.log(e.stack);
                console.log('\x1b[33m%s\x1b[0m', "Personens dm er lukket så kan ikke skrive privat til dem");
            }
        }
        member.roles.add((client.guilds.cache.get('825000372710932490')).roles.cache.get(vel.autoRolleID)); // Det her er den rolle man får når man joiner

        console.log(`${member} Joinede serveren`)
    })
}