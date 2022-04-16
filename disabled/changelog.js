const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('Skriv din changelog!')
        .addRoleOption(option => 
            option.setName('muted')
            .setDescription('Select a role'))
        
            .addStringOption(option => 
            option.setName('input')
            .setDescription('Enter a string'))
        
            .addStringOption(option => 
            option.setName('input')
            .setDescription('Enter a string'))
        
            .addStringOption(option =>
            option.setName('category')
                .setDescription('The gif category')
                .setRequired(true)
                .addChoice('Funny', 'gif_funny')
                .addChoice('Meme', 'gif_meme')
                .addChoice('Movie', 'gif_movie'))
		,

	async execute(interaction) {

        var besked = new MessageEmbed()
        .setTitle()
        .setDescription()// beskeden
        .setFooter({ content:'Tak for at læse vores changelog :)' })
        .setTimestamp()
        .setColor(0x0000ff)

		await interaction.reply({
			content: 'Haha der trode du lige jeg ville skrive noget andet hva',
			ephemeral: true
		});
	
    },
};