/*const botconfig = require("../botconfig.json");
const { Formatters } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Viser ip\'en til vores server'),
  async execute(interaction) {

    const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method
    const modal = new Modal() // We create a Modal
      .setCustomId('suportmodalID') // We set the custom ID
      .setTitle('Support')
      .addComponents([
        new TextInputComponent() // We create a Text Input Component
          .setCustomId('suporttekstID')
          .setLabel('Beskriv dit problem')
          .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(25)
          .setMaxLength(500)
          .setPlaceholder('Der var en bug og jeg har mistet mine penge')
          .setRequired(true) // If it's required or not
      ]);

    await interaction.reply({ embeds: [Embed] });
  },

}*/