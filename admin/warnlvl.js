const fs = require("fs");
const { MessageEmbed } = require("discord.js");
//const ms = require("ms");
module.exports.run = async (bot, message, args) => {
  message.delete()
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

  if (!message.guild.roles.cache.find(role => role.name === "Staff")) return message.channel.send("Hov hov det må du vist ikke").then(msg => msg.delete({ timeout: 10000 }));
  let wUser = message.mentions.members.first()
  if (!wUser) return message.channel.send("Du skal @tag en bruger")//.then(msg => msg.delete({ timeout: 50000 }))


  if (!warns[wUser.id]) {
    message.channel.send(`Denner person har ingen advarlser\nKeep up the good behavior`);
  } else {
    if (!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };
    let warnlevel = warns[wUser.id].warns;

    message.channel.send(`<@${wUser.id}> har ${warnlevel} advarlser`);
  }
}

module.exports.help = {
  name: "warnings",
  name2: "warnlvl"
}