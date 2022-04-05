//Her skal jeg lige huske de der ting der skal stå her
module.exports = (client) => {


    const { MessageActionRow, MessageButton } = require('discord.js');

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        if (interaction.commandName === 'ping') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('primary')
                        .setLabel('Primary')
                        .setStyle('PRIMARY'),
                );
    
            await interaction.reply({ content: 'Pong!', components: [row] });
        }
    });


    //Her skal jeg bruge button
}
