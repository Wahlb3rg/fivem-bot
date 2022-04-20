/*const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Giv en advarsel til en person'),
	async execute(interaction) {
       // let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

		await interaction.reply({ embeds: [Embed] });
	},
}*/

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fak')
        .setDescription('sus'),
    async execute(interaction) {
        await interaction.reply({ content: 'https://tenor.com/view/among-us-dance-dance-among-us-purple-sus-gif-18888988', ephemeral: true });
    },
};