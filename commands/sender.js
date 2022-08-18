const botconfig = require("../botconfig.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Sender en besked som botten')
        .addStringOption(option => option.setName('tekst').setDescription('Hvad skal botten sige?').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('En title til beskeden').setRequired(false))
        .addStringOption(option => option.setName('ping').setDescription('Hvilken rolle skal pinges')
            .addChoice('Ping', 'ping')
            .addChoice('Here', 'her')
            .addChoice('Everyone', 'alle')),
    async execute(interaction) {

        let Embed;
        if (interaction.options.getString('title') === null) {
            Embed = new MessageEmbed()
                .setDescription(interaction.options.getString('tekst'))
                .setColor(0xdd6544)
                .setFooter({ text: botconfig.footerText });
        } else {
            Embed = new MessageEmbed()
                .setDescription(interaction.options.getString('tekst'))
                .setColor(0xdd6544)
                .setFooter({ text: botconfig.footerText })
                .setTitle(interaction.options.getString('title'));
        }

        if (interaction.options.getString('ping') === true) {
            await interaction.channel.send({ embeds: [Embed], content: '<@&842817228248449074>' });
        } else {
            await interaction.channel.send({ embeds: [Embed] });
        }

        if (interaction.options.getString('ping') === 'her' || 'alle') {
            await interaction.reply({ content: 'Det er kun ledelsen der kan pinge everyone og here', ephemeral: true });
        }
    },
};