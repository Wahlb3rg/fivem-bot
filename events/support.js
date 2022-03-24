const botconfig = require("../botconfig.json");
const { Formatters } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
module.exports = function (client) {

    const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

    const modal = new Modal() // We create a Modal
    .setCustomId('modal-customid')
    .setTitle('Test of Discord-Modals!')
    .addComponents([
      new TextInputComponent() // We create a Text Input Component
      .setCustomId('textinput-customid')
      .setLabel('Some text Here')
      .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
      .setMinLength(4)
      .setMaxLength(10)
      .setPlaceholder('Write a text here')
      .setRequired(true) // If it's required or not
    ]);
    
    client.on('interactionCreate', (interaction) => {
      // Let's say the interaction will be a Slash Command called 'ping'.
      if(interaction.commandName === 'ping'){
        showModal(modal, {
          client: client, // Client to show the Modal through the Discord API.
          interaction: interaction // Show the modal with interaction data.
        })
      }
      
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }
    });


    client.on('modalSubmit', async (modal) => {
      if(modal.customId === 'modal-customid'){
        const firstResponse = modal.getTextInputValue('textinput-customid')
        await modal.deferReply({ ephemeral: true })
        modal.followUp({ content: 'Congrats! Powered by discord-modals.' + Formatters.codeBlock('markdown', firstResponse), ephemeral: true })
      }  
    });

}