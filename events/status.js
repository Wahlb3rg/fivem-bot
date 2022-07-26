const config = require("../botconfig.json");
const { MessageEmbed } = require('discord.js');
const fivereborn = require('fivereborn-query'); // tager reborn query (bruges til at sætte bot activity)
module.exports = function (client) {

    /*client.on('ready', async () => {

        function activity() { // laver funktionen activity
            setTimeout(() => { // laver et loop
                let myGuild = client.guilds.cache.get(config.guildId);
                let memberCount = myGuild.memberCount;
                client.user.setPresence({ activities: [{ name: `Member • ${memberCount}`, type: 'WATCHING' }] });
                activity();
            }, 10000);
        }
        activity();
    });*/

    function activity() { // laver funktionen activity
        setTimeout(() => { // laver et loop
            fivereborn.query(config.ip, config.ipport, (err, data) => { // starter fivereborn event, IP:PORT
                if (err) { // logger hvis der er fejl
                    console.log(err);
                    console.log(data); // logger fejlen
                } else {//  ellers skal den sætte activity

                    if (data.clients <= 5) {
                        client.user.setPresence({ activities: [{ name: `Få folk i byen`, type: 'WATCHING' }] });
                        client.channels.cache.get('947498929715556372').setName(`Antal spillere: ${data.clients}/${data.maxclients}`)//.then(client.channels.cache.get('842471936952631336').send('Opdaterde antal'))
                    } else if (data.clients == 32) {
                        client.user.setPresence({ activities: [{ name: `Byen er helt fyldt op :pog:`, type: 'WATCHING' }] });
                        client.channels.cache.get('947498929715556372').setName(`Antal spillere: ${data.clients}/${data.maxclients}`)
                    } else {
                        client.user.setPresence({ activities: [{ name: `${data.clients} i byen`, type: 'WATCHING' }] });//  /${data.maxclients}
                        client.channels.cache.get('947498929715556372').setName(`Antal spillere: ${data.clients}/${data.maxclients}`)
                    }

                }
                if (err) console.log(err);
            });
            activity();
        }, 10000);
    }
    activity();

}