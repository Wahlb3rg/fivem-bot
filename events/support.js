const botconfig = require("../botconfig.json");
const { Formatters } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
module.exports = function (client) {

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

  client.on('interactionCreate', (interaction) => {
    // Let's say the interaction will be a Slash Command called 'support'.
    if (interaction.commandName === 'support') {
      showModal(modal, {
        client: client, // Client to show the Modal through the Discord API.
        interaction: interaction // Show the modal with interaction data.
      })
    }

  });

}