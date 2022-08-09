const { footerText, publicIp } = require("../botconfig.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Viser ip\'en til vores server'),
	async execute(interaction) {

        let Embed = new MessageEmbed()
        .setColor(0xFFFF00)
        .setTitle(`Ip til vores server!`)
        .setDescription(`Server:\`\`\`Connect ${publicIp}\`\`\``)//Teamspeak:\`\`\`94.130.237.93\`\`\`
        .setFooter({ text: footerText })
        //.setTimestamp()

		await interaction.reply({ embeds: [Embed] });
	},
};