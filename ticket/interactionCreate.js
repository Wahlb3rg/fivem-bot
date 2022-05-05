let hastebin = require('hastebin');
const { parentOpened, parentTransactions, parentJeux, parentAutres, roleSupport, logsTicket } = require('../botconfig.json');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    if (!interaction.isButton()) return;
    if (interaction.customId == "open-ticket") {
      if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
        return interaction.reply({
          content: 'Du har allerede oprettet en ticket!',
          ephemeral: true
        });
      };

      //Det her skal lige laves om så den laver et tal og ikke deres navn
      interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        parent: parentOpened,
        topic: interaction.user.id,
        permissionOverwrites: [{
          id: interaction.user.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: roleSupport,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        ],
        type: 'text',
      }).then(async c => {
        interaction.reply({
          content: `Din ticket er blevet oprette og du kan finde den her - <#${c.id}>`,
          ephemeral: true
        });

        const embed = new MessageEmbed()
          .setColor('6d6ee8')
          .setAuthor({ name: 'Ticket', iconURL: client.user.avatarURL() })
          .setDescription('Vælg den kategori der passer bedst til dit problem/spørgsmål')
          .setFooter('ExoHost.fr', 'https://i.imgur.com/oO5ZSRK.png')
          .setTimestamp();

        const row = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setCustomId('category')
              .setPlaceholder('Vælg kategori')
              .addOptions([{
                label: 'Transaction',
                value: 'transaction',
                emoji: '🪙',
              },
              {
                label: 'Jeux',
                value: 'jeux',
                emoji: '🎮',
              },
              {
                label: 'Autres',
                value: 'autre',
                emoji: '📔',
              },
              ]),
          );

        msg = await c.send({
          content: `<@!${interaction.user.id}>`,
          embeds: [embed],
          components: [row]
        });

        const collector = msg.createMessageComponentCollector({
          componentType: 'SELECT_MENU',
          time: 20000
        });

        collector.on('collect', i => {
          if (i.user.id === interaction.user.id) {
            if (msg.deletable) {
              msg.delete().then(async () => {
                const embed = new MessageEmbed()
                  .setColor('6d6ee8')
                  .setAuthor('Ticket', 'https://i.imgur.com/oO5ZSRK.png')
                  .setDescription(`<@!${interaction.user.id}> Lavet en ticket  ${i.values[0]}`)
                  .setFooter('ExoHost.fr', 'https://i.imgur.com/oO5ZSRK.png')
                  .setTimestamp();

                const row = new MessageActionRow()
                  .addComponents(
                    new MessageButton()
                      .setCustomId('close-ticket')
                      .setLabel('Luk ticket')
                      .setEmoji('899745362137477181')
                      .setStyle('DANGER'),
                  );

                const opened = await c.send({
                  content: `<@&${roleSupport}>`,
                  embeds: [embed],
                  components: [row]
                });

                opened.pin().then(() => {
                  opened.channel.bulkDelete(1);
                });
              });
            };
            if (i.values[0] == 'transaction') {
              c.edit({
                parent: parentTransactions
              });
            };
            if (i.values[0] == 'jeux') {
              c.edit({
                parent: parentJeux
              });
            };
            if (i.values[0] == 'autre') {
              c.edit({
                parent: parentAutres
              });
            };
          };
        });

        collector.on('end', collected => {
          if (collected.size < 1) {
            c.send(`Ingen kategori valgt. Din ticket bliver lukket...`).then(() => {
              setTimeout(() => {
                if (c.deletable) {
                  c.delete();
                };
              }, 5000);
            });
          };
        });
      });
    };

    if (interaction.customId == "close-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('confirm-close')
            .setLabel('Luk ticket')
            .setStyle('DANGER'),
          new MessageButton()
            .setCustomId('no')
            .setLabel('Behold ticket åben')
            .setStyle('SECONDARY'),
        );

      const verif = await interaction.reply({
        content: 'Er du sikker på, at du vil lukke din ticket?',
        components: [row]
      });

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 10000
      });

      collector.on('collect', i => {
        if (i.customId == 'confirm-close') {
          interaction.editReply({
            content: `Ticket lukket af <@!${interaction.user.id}>`,
            components: []
          });

          chan.edit({
            //Her skal jeg igen få tallet som der er brugt noget med at tager navnet og fjerne ja 
            name: `closed-${chan.name}`,
            permissionOverwrites: [
              {
                id: client.users.cache.get(chan.topic),
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
              },
              {
                id: roleSupport,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
              },
              {
                id: interaction.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
              },
            ],
          })
            .then(async () => {
              const embed = new MessageEmbed()
                .setColor('6d6ee8')
                .setAuthor('Ticket', 'https://i.imgur.com/oO5ZSRK.png')
                .setDescription('```Billetkontrol | ved ikke hvad det her er```')
                .setFooter('ExoHost.fr', 'https://i.imgur.com/oO5ZSRK.png')
                .setTimestamp();

              const row = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId('delete-ticket')
                    .setLabel('Slet ticket')
                    .setEmoji('🗑️')
                    .setStyle('DANGER'),
                );

              chan.send({
                embeds: [embed],
                components: [row]
              });
            });

          collector.stop();
        };
        if (i.customId == 'no') {
          interaction.editReply({
            content: 'Din ticket blev ikke lukket!',
            components: []
          });
          collector.stop();
        };
      });

      collector.on('end', (i) => {
        if (i.size < 1) {
          interaction.editReply({
            content: 'Din ticket blev ikke lukket!',
            components: []
          });
        };
      });
    };

    if (interaction.customId == "delete-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      interaction.reply({
        content: 'Gemmer beskeder...'
      });

      chan.messages.fetch().then(async (messages) => {
        let a = messages.filter(m => m.author.bot !== true).map(m =>
          `${new Date(m.createdTimestamp).toLocaleString()} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        ).reverse().join('\n');
        if (a.length < 1) a = "Nothing"
        hastebin.createPaste(a, {
          contentType: 'text/plain',
          server: 'https://hastebin.com/'
        }, {})
          .then(function (urlToPaste) {
            const embed = new MessageEmbed()
              .setAuthor('Logs Ticket', 'https://i.imgur.com/oO5ZSRK.png')
              .setDescription(`📰 Ticket log \`${chan.id}\` oprettet af <@!${chan.topic}> og slettet af <@!${interaction.user.id}>\n\nLog: [**Klik her for at se logfiler**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            const embed2 = new MessageEmbed()
              .setAuthor('Logs Ticket', 'https://i.imgur.com/oO5ZSRK.png')
              .setDescription(`📰 Logfiler over din ticket \`${chan.id}\`: [**Klik her for at se logfiler**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            client.channels.cache.get(logsTicket).send({
              embeds: [embed]
            });
            client.users.cache.get(chan.topic).send({
              embeds: [embed2]
            }).catch(() => { console.log('I can\'t dm him :(') });
            chan.send('Sletter kanal...');

            setTimeout(() => {
              chan.delete();
            }, 5000);
          });
      });
    };
  },
};
