let hastebin = require('hastebin');
let fs = require('fs');
const { parentClosed, parentOpened, parentdevsup, parentsub, parentwhitsup, roleSupport, logsTicket, footerText } = require('../botconfig.json');
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

      let tic = JSON.parse(fs.readFileSync("ticket/numb.json", "utf8"));
      let nimsenumse = interaction.guildId;
      if (!tic[nimsenumse]) {
        tic[nimsenumse] = {
          ticket: 0
        };
      }

      tic[nimsenumse].nr++;
      fs.writeFile("ticket/numb.json", JSON.stringify(tic, null, 4), (err) => {
        if (err) console.log(err)
      });
      //Det her skal lige laves om så den laver et tal og ikke deres navn
      interaction.guild.channels.create(`ticket-${tic[nimsenumse].nr}`, {
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
          .setFooter({ text: footerText })
          .setTimestamp();

        const row = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setCustomId('category')
              .setPlaceholder('Vælg en kategori')
              .addOptions([{
                label: 'Support',
                value: 'sub',
                emoji: '🎮',
              },
              {
                label: 'Developer Support',
                value: 'devsup',
                emoji: '979881537489223700',
              },
              {
                label: 'Whitelist Support',
                value: 'whitsup',
                emoji: '📝',
              },
                /*{
                  label: '',
                  value: '',
                  emoji: '',
                },*/
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
                  .setAuthor({ name: 'Ticket', iconURL: 'https://cdn.discordapp.com/emojis/979881537489223700.webp?size=96&quality=lossless' })
                  .setDescription(`<@!${interaction.user.id}> Lavet en ticket\nForklar hvad dit problem er og så vil en fra vores staff team svare så hurtigt som muligt.`/*${i.values[0]}`*/)
                  .setFooter({ text: footerText })
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
            if (i.values[0] == 'devsup') {
              c.edit({
                parent: parentdevsup
              });
            };
            if (i.values[0] == 'sub') {
              c.edit({
                parent: parentsub
              });
            };
            if (i.values[0] == 'whitsup') {
              c.edit({
                parent: parentwhitsup
              });
            };
          };
        });

        collector.on('end', collected => {
          if (collected.size < 1) {
            msg.delete().then(async () => {
              c.send(`Du valgte ikke en kategori i tide. Din ticket bliver derfor markeret som åben men ventetiden kan være længere.\nSlet denne ticket og lav den med den rigtige kategori hvis du gerne vil komme i kontakt med de rigtige.`)
                .then(() => {
                  setTimeout(() => {
                    if (c.deletable) {
                      c.delete();
                    };
                  }, 5000);
                });
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
        content: `<@${interaction.user.id}> er du sikker på, at du vil lukke din ticket?`,
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

          var str = chan.name;
          var matches = str.match(/\d+/)[0]
          chan.edit({
            //Her skal jeg igen få tallet som der er brugt noget med at tager navnet og fjerne ja 
            name: `lukket-${matches}`,
            parent: parentClosed,
            topic: "Lukket " + interaction.user.id + " Lukket",
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
                .setAuthor({ name: 'Ticket', iconURL: 'https://cdn.discordapp.com/emojis/979881537489223700.webp?size=96&quality=lossless' })
                .setDescription('```Ticket er lukket, denne ticket kan genåbnes igen```')
                .setFooter({ text: footerText })
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
        if (a.length < 1) a = "SYSTEM: Der blev ikke skrevet noget i denne ticket (╯°□°）╯︵ ┻━┻"
        hastebin.createPaste(a, {
          contentType: 'text/plain',
          server: 'https://hastebin.com/'
        }, {})
          .then(function (urlToPaste) {
            var str = chan.topic;
            var person = str.match(/\d+/)[0]
            const embed = new MessageEmbed()
              .setAuthor({ name: 'Ticket', iconURL: 'https://cdn.discordapp.com/emojis/979881537489223700.webp?size=96&quality=lossless' })
              .setDescription(`📰 Ticket log \`${chan.id}\` oprettet af <@!${person}> og slettet af <@!${interaction.user.id}>\n\nLog: [**Klik her for at se logfiler**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            const embed2 = new MessageEmbed()
              .setAuthor({ name: 'Logs Ticket', iconURL: 'https://cdn.discordapp.com/emojis/979881537489223700.webp?size=96&quality=lossless' })
              .setDescription(`📰 Logfiler over din ticket \`${chan.id}\`: [**Klik her for at se loggen**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            client.channels.cache.get(logsTicket).send({
              embeds: [embed]
            });
            try {
              client.users.cache.get(person).send({
                embeds: [embed2]
              }).catch(() => { console.log('I can\'t dm him :(') });
            } catch (error) {
              console.log(error)
            }
            chan.send('Sletter kanal...');

            setTimeout(() => {
              chan.delete();
            }, 5000);
          });
      });
    };
  },
};
