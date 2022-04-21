const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnlvl')
        .setDescription('Vis antalet af advarsler du eller en bruger har fået'),
    async execute(interaction) {
        await interaction.reply({ content: 'https://tenor.com/view/among-us-dance-dance-among-us-purple-sus-gif-18888988', ephemeral: true });
    },
};