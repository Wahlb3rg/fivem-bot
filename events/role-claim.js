const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = (client) => {

    client.on('interactionCreate', async interaction => {

        if (interaction.commandName === 'ping') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('PingTil')
                        .setLabel('Slå til')
                        .setStyle('SUCCESS'),
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('PingFra')
                        .setLabel('Slå fra')
                        .setStyle('DANGER'),
                );

            const embed = new MessageEmbed()
                .setTitle('Ping Pong')
                .setColor('6d6ee8')
                .setDescription('Hvis du gerne vil have ping skal du trykke på den grønne kanp\n\nHvis du gerne vil af med ping rollen igen skal du trykke på den røde kanp')

            await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
        }

        const filter = i => i.customId === 'PingTil' || 'PingFra';
        const wait = require('node:timers/promises').setTimeout;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'PingTil') {
                await i.deferUpdate();
                await wait(4000);
                await i.editReply({ content: 'Ping til blev trykket', components: [] });

            } else if (i.customId === 'PingFra') {
                await i.deferUpdate();
                await wait(4000);
                await i.editReply({ content: 'Ping fra blev trykket!', components: [] });
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    });
}
