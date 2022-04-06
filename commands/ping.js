const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Svare med pong!'),
	async execute(interaction) {
		await interaction.reply({
			content: 'Haha der trode du lige jeg ville skrive noget andet hva',
			ephemeral: true
		});
	},
};