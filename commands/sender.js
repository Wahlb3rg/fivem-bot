const botconfig = require("../botconfig.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('Sender en besked som botten')
        .addStringOption(option => option.setName('input').setDescription('Hvad skal botten sige?').setRequired(true)),
	async execute(interaction) {

        const tingting = interaction.options.getString('input');
        var Embed = new MessageEmbed()
            .setTitle("")
            .setDescription(tingting)// beskeden
            .setColor(0xdd6544)
    
		await interaction.channel.send({ embeds: [Embed] });
	},
};