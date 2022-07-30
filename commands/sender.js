const botconfig = require("../botconfig.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Sender en besked som botten')
        .addStringOption(option => option.setName('tekst').setDescription('Hvad skal botten sige?').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('En title til beskeden').setRequired(false)),
    async execute(interaction) {

        var Embed = new MessageEmbed()
            .setTitle(interaction.options.getString('title'))
            .setDescription(interaction.options.getString('tekst'))
            .setColor(0xdd6544)

        await interaction.channel.send({ embeds: [Embed] });
    },
};