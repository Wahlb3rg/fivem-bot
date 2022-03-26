const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    let besked = JSON.parse(fs.readFileSync("commands/stickey.json", "utf8"));

    if (message.guild.roles.cache.find(role => role.name === "Staff")) {
        try {
            message.delete();
            let kanalen = message.channel.id

            if (!besked[kanalen]) return;
            besked[kanalen].messageCount = 0;
            besked[kanalen].besked = "";
            besked[kanalen].beskedid = "";

            fs.writeFile("commands/stickey.json", JSON.stringify(besked, null, 4), (err) => {
                if (err) console.log(err)
            });
            
        } catch (error) {
            console.error(error);
        }
    }
}
module.exports.help = {
    name: "utik"
}