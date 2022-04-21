const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require('../botconfig.json');
const wait = require('node:timers/promises');
module.exports = (client) => {

    client.on('interactionCreate', async interaction => {
        try {
            if (await interaction.commandName === 'ping') {
                //await interaction.deferReply();
                const til = new MessageActionRow()
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
                            .setStyle('DANGER')
                            .setDisabled(true),
                    );

                const fra = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('PingTil')
                            .setLabel('Slå til')
                            .setStyle('SUCCESS')
                            .setDisabled(true),
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId('PingFra')
                            .setLabel('Slå fra')
                            .setStyle('DANGER')
                        ,
                    );

                const embed = new MessageEmbed()
                    .setTitle('Ping Pong')
                    .setColor('6d6ee8')
                    .setDescription('Hvis du gerne vil have ping skal du trykke på den grønne kanp\n\nHvis du gerne vil af med ping rollen igen skal du trykke på den røde kanp')

                if (!interaction.member.roles.cache.some(role => role.id === config.pingroleID)) {
                    await interaction.reply({ embeds: [embed], components: [til], ephemeral: true });
                } else if (interaction.member.roles.cache.some(role => role.id === config.pingroleID)) {
                    await interaction.reply({ embeds: [embed], components: [fra], ephemeral: true });
                } else {
                    await interaction.reply({ content: 'Der skete en fejl prøv igen eller spørg en staff om hjælp', ephemeral: true });
                }
            }
        } catch (error) {
            console.log('interactionCreate error: ' + error);
        }

        try {

            const filter = i => i.customId === 'PingTil' || 'PingFra';
            const wait = require('node:timers/promises').setTimeout;
            const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'PingTil') {
                    const embed2 = new MessageEmbed()
                        .setTitle('Ping Pong')
                        .setColor('00ff00')
                        .setDescription(`${interaction.member} du har nu slået ping rollen til`)

                    let role = await interaction.guild.roles.cache.find(r => r.id === config.pingroleID); // The member you want to add the role to.
                    await interaction.member.roles.add(role);

                    await i.deferUpdate();
                    await wait(40);
                    await i.editReply({ embeds: [embed2], components: [] });

                } else if (i.customId === 'PingFra') {
                    const embed3 = new MessageEmbed()
                        .setTitle('Ping Pong')
                        .setColor('ff0000')
                        .setDescription(`${interaction.member} du har nu slået ping rollen fra`)

                    let role = await interaction.guild.roles.cache.find(r => r.id === config.pingroleID); // The member you want to add the role to.
                    await interaction.member.roles.remove(role);

                    await i.deferUpdate();
                    await wait(40);
                    await i.editReply({ embeds: [embed3], components: [] });
                }
            });

            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        } catch (error) {
            console.log('colleter error: ' + error);
        }
    });
}
