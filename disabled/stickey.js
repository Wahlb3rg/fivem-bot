const { MessageEmbed } = require('discord.js');
const fs = require("fs");

module.exports = function (client, message) {
    console.log('Sticky messages')
    console.log('--------------------------')

    let besked = JSON.parse(fs.readFileSync("commands/stickey.json", "utf8"));

    client.on("messageCreate", async function (message) {
        if (message.author.bot) return;
        let kanalen = message.channel.id;
        console.log(message.channel.id)
        console.log(besked)
        if (kanalen === besked) {
            besked[kanalen].messageCount++;
            console.log(message.content);
            if (besked[kanalen].messageCount <= 3) {
                await besked[kanalen].beskedid.delete();
                await message.channel.send(besked[kanalen].besked);
                besked[kanalen].messageCount = 0;
            }
        }
    });
}