const { footerText} = require("../botconfig.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('afstemning')
		.setDescription('Laver en afstemning og sætter en bestem tid af hvor efter den afsluttes')
        .addStringOption(option => option.setName('title').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('question').setDescription('Hvad skal botten sskal der stemmes om?').setRequired(true)),

        async execute(interaction) {

        
        var Embed = new MessageEmbed()
        .setTitle(interaction.options.getString('title'))
        .setColor("#2186ba")
        .setDescription(interaction.options.getString('question'))
        .setFooter({ text: footerText })

    
		await interaction.channel.send({ embeds: [Embed] }).then( (interaction) => {
            interaction.react('👍')
            .then(() => interaction.react('👎'))
        });
	},
};