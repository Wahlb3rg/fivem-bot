const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require('../botconfig.json');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
//        let support = new MessageEmbed()
//    	.setDescription(`${message.author} har brug for hjælp`)
//    	.setColor("#ff0000")
//       	.setTimestamp()
//    	.setFooter(`Lavet af wahlberg#6270`)
//    
//    message.channel.send(`<@&${botconfig.staffrole}>`).then(message.channel.send({ embeds: [support] })).then(msg => msg.delete({ timeout: 300000 }))
 
// at the top of your file
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

message.channel.send({ embeds: [exampleEmbed] });

}
module.exports.help = {
    name: "support"
}

