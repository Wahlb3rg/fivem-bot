const botconfig = require("../botconfig.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('Sender en besked som botten')
        .addStringOption(option => option.setName('Title').setDescription('En title til beskeden'))
        .addStringOption(option => option.setName('Tekst').setDescription('Hvad skal botten sige?').setRequired(true)),
	async execute(interaction) {

        var Embed = new MessageEmbed()
            .setTitle(interaction.options.getString('Title'))
            .setDescription(interaction.options.getString('Tekst'))
            .setColor(0xdd6544)
    
		await interaction.channel.send({ embeds: [Embed] });
	},
};