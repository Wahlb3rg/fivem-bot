const botconfig = require("../botconfig.json");
const { MessageEmbed } = require('discord.js');
module.exports = function (client) {

    const discordModals = require('discord-modals')
    discordModals(client);

    const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method
    const modal = new Modal() // We create a Modal
        .setCustomId('suportmodalID') // We set the custom ID
        .setTitle('Support')
        .addComponents([
            new TextInputComponent() // We create a Text Input Component
                .setCustomId('suporttekstID')
                .setLabel('Beskriv dit problem')
                .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
                .setMinLength(1)//25
                .setMaxLength(500)
                .setPlaceholder('Der var en bug og jeg har mistet mine penge')
                .setRequired(true) // If it's required or not
        ])
        .addComponents([
            new TextInputComponent() // We create a Text Input Component
                .setCustomId('suporttekstID2')
                .setLabel('Beskriv dit problem')
                .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
                .setMinLength(1)//25
                .setMaxLength(500)
                .setPlaceholder('Der var en bug og jeg har mistet mine penge')
                .setRequired(true) // If it's required or not
        ])
        .addComponents([
            new TextInputComponent() // We create a Text Input Component
                .setCustomId('suporttekstID3')
                .setLabel('Beskriv dit problem')
                .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
                .setMinLength(1)//25
                .setMaxLength(500)
                .setPlaceholder('Der var en bug og jeg har mistet mine penge')
                .setRequired(true) // If it's required or not
        ])

    client.on('interactionCreate', (interaction) => {
        // Let's say the interaction will be a Slash Command called 'support'.
        if (interaction.commandName === 'support') {
            showModal(modal, {
                client: client, // Client to show the Modal through the Discord API.
                interaction: interaction // Show the modal with interaction data.
            })
        }

    });

    client.on('modalSubmit', async (modal) => {
        if (modal.customId === 'suportmodalID' && 'suporttekstID2' && 'suporttekstID3') {
            const firstResponse = modal.getTextInputValue('suporttekstID')
            const secondResponse = modal.getTextInputValue('suporttekstID2')
            const thirdResponse = modal.getTextInputValue('suporttekstID3')
            modal.reply('Congrats! Powered by discord-modals.' + Formatters.codeBlock('markdown', `${firstResponse}\n${secondResponse}\n${thirdResponse}`))
        }
    });

};