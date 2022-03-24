const { MessageEmbed } = require('discord.js');
const fs = require("fs");

module.exports = function (client, message) {
    console.log('Sticky messages')
    console.log('--------------------------')
    
    let besked = JSON.parse(fs.readFileSync("commands/stickey.json", "utf8"));
    let messageCount = 0;
    let stickyMessageContent = "";
    let kanalen = besked

    client.on("message", async function (message) {
        if (message.author.bot) {
            return;
        }

        if (message.content.indexOf('!') !== 0) {
            if (besked[kanalen].besked !== "") {
                if (message.channel.id === besked[kanalen]) {
                    besked[kanalen].messageCount++;
                    if (messageCount === 3) {
                        await lastStickyMessage.delete();

                        besked[kanalen].besked = await message.channel.send(besked[kanalen].besked);
                        besked[kanalen].messageCount = 0;
                    }
                }
            }
            return;
        }

        const args = message.content.slice(1).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const suportrank = "staff"

        if (command === "stickssss") {

            if (message.member.roles.cache.some(role => role.name === 'Staff')) {
                try {
                    stickyMessageContent = args.slice(0).join(" ");
                    message.delete();
        
                    let kanalen = message.channel.id
        
                    if (!besked[kanalen]) besked[kanalen] = {
                        besked: stickyMessageContent,
                        messageCount: 0
                    };
                    besked[kanalen].messageCount++;
                    besked[kanalen].besked = stickyMessageContent;
        
                    fs.writeFile("commands/stickey.json", JSON.stringify(besked, null, 4), (err) => {
                        if (err) console.log(err)
                    });
        
                    message.channel.send(`Ja der burde sket det at dne skriver. Det her er kanalen ${kanalen}\n${stickyMessageContent}`)
                } catch (error) {
                    console.error(error);
                }
            } else { message.delete(); message.channel.send(`No :)`); }

        } else if (command === "unstick") {
            if (message.guild.roles.cache.find(role => role.name === suportrank)) {
                message.delete();
                let kanalen = message.channel.id

                if (!kanalen[besked]) kanalen[besked] = {
                    besked: "",
                    messageCount: 0
                };
                kanalen[besked].messageCount++;

                fs.writeFile("warnings.json", JSON.stringify(besked, null, 4), (err) => {
                    if (err) console.log(err)
                });

            }
        }
    });



}