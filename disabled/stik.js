const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    let besked = JSON.parse(fs.readFileSync("commands/stickey.json", "utf8"));

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
    } else { message.delete(); message.channel.send(`No :) `); }
}
module.exports.help = {
    name: "tik"
}