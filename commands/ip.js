const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed} = require("discord.js");
const ipc = require('../config/ipconfig.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Viser ip\'en til vores server'),
	async execute(interaction) {

        let Embed = new MessageEmbed()
        .setColor(0xFFFF00)
        .setTitle(ipc.titel)
        .setDescription(`Server:\`\`\`${ipc.publicIp}\`\`\``)//Teamspeak:\`\`\`94.130.237.93\`\`\`
        //.setFooter({ text: 'Lavet af wahlberg#6270' })
        .setTimestamp()

		await interaction.reply({ embeds: [Embed] });
	},
};