const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {

    message.delete();

    let tingting = args.slice(0).join(" ");
    if (!tingting) return message.channel.send(`Du skal lige huske at skrvie noget`)

    var beskeden = message.content.toString();
    var d = new Date();
    //console.log(d.toLocaleTimeString());
    //console.log(d.toLocaleString());
    console.log(d.toLocaleDateString());

    var besked = new MessageEmbed()
        .setTitle("")
        .setDescription(tingting)// beskeden
        //.setFooter({ text: `Lavet af wahlberg#6270`})
        //.setTimestamp()
        .setColor(0xdd6544)

    message.channel.send({ embeds: [besked] })

}

module.exports.help = {
    name: "send"
}