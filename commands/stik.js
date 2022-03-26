const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    let besked = JSON.parse(fs.readFileSync("commands/stickey.json", "utf8"));

    if (message.member.roles.cache.some(role => role.name === 'Staff')) {
        try {
            stickyMessageContent = args.slice(0).join(" ");
            message.delete();

            let kanalen = message.channel.id
            let sent = await message.channel.send(stickyMessageContent) // this returns the message you just sent
            let idtilbeskeden = sent.id;

            if (!besked[kanalen]) besked[kanalen] = {
                besked: stickyMessageContent,
                messageCount: 0,
                beksedid: idtilbeskeden
            };
            besked[kanalen].messageCount = 0;
            besked[kanalen].besked = stickyMessageContent;
            besked[kanalen].beskedid = idtilbeskeden;

            fs.writeFile("commands/stickey.json", JSON.stringify(besked, null, 4), (err) => {
                if (err) console.log(err)
            });

        } catch (error) {
            console.error(error);
        }
    } else { message.delete(); message.channel.send(`No :) `); }
}
module.exports.help = {
    name: "tik"
}