const { MessageEmbed } = require('discord.js');
const fs = require("fs");

module.exports = function (client, message) {
    console.log('Sticky messages')
    console.log('--------------------------')

    let besked = JSON.parse(fs.readFileSync("normcommands/stickey.json", "utf8"));

    client.on("messageCreate", async function (message) {
        if (message.author.bot) return;
        let kanalen = message.channel.id;
        
        
        //if (message.channel.id === besked[kanalen]) {
            console.log(`${besked[kanalen].messageCount}`)
            besked[kanalen].messageCount++;
            if (besked[kanalen].messageCount <= 3) {
                await besked[kanalen].beskedid.delete();
                await message.channel.send(besked[kanalen].besked);
                besked[kanalen].messageCount = 0;
            }
        //}

    });
}