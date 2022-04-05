const sc = require('../config/supportconfig.json');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {

    const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

    // inside a command, event listener, etc.
    /*    const exampleEmbed = new MessageEmbed()
            .setColor(sc.farve)
            .setTitle(sc.titel)
            .setDescription(sc.description)
            .setTimestamp()
            .setFooter({ text: 'Lavet af wahlberg#6270'});
    
        message.channel.send({ embeds: [exampleEmbed] });
    */

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
        
        message.channel.send(showModal(modal, {
            client: client, // Client to show the Modal through the Discord API.
          }))


}
module.exports.help = {
    name: "supposwsssssrt"
}