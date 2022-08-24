const { SlashCommandBuilder } = require('@discordjs/builders');
const { roleSupport } = require('../botconfig.json');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Manage ticket')
    .addStringOption(option => option.setName('tilføj-fjern')
      .setDescription('Skal der tilføjes eller fjernes en person')
      .addChoice('Tilføj person', 'add').addChoice('Fjern person', 'remove')
      .setRequired(true))
    .addUserOption(option => option.setName('hvem')
      .setDescription('Hvem skal tilføjes eller fjerne?')
      .setRequired(true)),

  execute: async function (interaction) {
    //const guild = interaction.guilds.cache.get(interaction.guildId);

    const /*user*/ tadadada = interaction.options.getUser('hvem');

    //return interaction.channel.reply({ content: 'Dette virker ikke lige nu få en staff til at få dem ind' });

    /*return console.log(interaction.guild.channels.get(interaction.channel.id).members.forEach((member) => {
      console.log(member)
    }))*/

    if (!interaction.channel.name.includes('ticket')) return interaction.reply({
      content: 'Du er ikke i en ticket!',
      ephemeral: true
    });
    if (!(interaction.channel.topic === interaction.user.id || interaction.member.roles.cache.some(role => role.id === roleSupport))) {

      return interaction.reply({
        content: 'Du skal være den der oprettede ticketen for at tilføje eller fjerne medlemmer.',
        ephemeral: true
      });

    } else {
      // TODO Gør så man kan tilføje personer og fjerne dem. Prob den tilføjer ikke folk rigtig og fjerner dem ikke rigtig
      if (interaction.options.getString('tilføj-fjern') === 'add') {

        /*interaction.channel.edit({
          permissionOverwrites: [
            {
              id: user,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
            {
              id: roleSupport,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
          ],
        }).then(async () => {
          interaction.reply({
            content: `<@${user.id}> blev tilføjet til ticket!`
          });
        }).catch(err => {
          console.log(err)
        });*/
        await interaction.channel.permissionOverwrites.edit(tadadada.id, { ViewChannel: true });

      } else if (interaction.options.getString('tilføj-fjern') === 'remove') {


        interaction.channel.edit({
          permissionOverwrites: [
            {
              id: user,
              deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
            {
              id: roleSupport,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
          ],
        }).then(async () => {
          interaction.reply({
            content: `<@${user.id}> blev tilføjet til ticket!`
          });
        });

      } else {
        return interaction.reply({
          content: 'Der var en fejl skriv til Wahlberg hvis dette bliver ved med at ske',
          ephemeral: true
        });
      }

    }
  },


};
