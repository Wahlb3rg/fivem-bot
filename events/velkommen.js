const config = require("../botconfig.json")
const { MessageEmbed, Client } = require('discord.js');
module.exports = function (client) {

    console.log('Velkommen')
    console.log('--------------------------')

    client.on('guildMemberAdd', async member => {

        const channel = client.channels.cache.get(config.velkommenKanalID);
        if (!channel) return console.log('Join kanalen kan ikke findes');

        let myGuild = client.guilds.cache.get(config.guildId);
        let memberCount = myGuild.memberCount;

        let hejbesked = new MessageEmbed()
            .setTitle(`Velkommen til **Destova 3.0**`)
            .setDescription(`Hej ${member} og Velkommen til Destova discorden.\nHusk at læse vores regler <#826109165876936724>\n\nMedlem nummer: ${memberCount}`)
            .setColor(0x2f3136)

        channel.send({ content: `Hej ${member}`, embeds: [hejbesked] })

        if (member) {
            try {
                await member.send(`Besked fra staff teamet: Hej og velkommen til **Destova**\n\nHvis du vil kontakte staff skal du gå ind i <#848850610794397696>`)
            } catch (e) {
                //console.log(e.stack);
                console.log('\x1b[33m%s\x1b[0m', "Personens dm er lukket så kan ikke skrive privat til dem");
            }
        }
        member.roles.add((client.guilds.cache.get(config.guildId)).roles.cache.get(config.autoRolleID)); // Det her er den rolle man får når man joiner

        console.log(`${member} Joinede serveren`)
    })

    client.on('guildMemberRemove', async member => {
        const left = client.channels.cache.get(config.leavKanalID);
        if (!left) return console.log('Leav kanalen kan ikke findes');
        left.send({ content: `${member} har forladt serveren` });
    })
}