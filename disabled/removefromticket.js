const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fjern')
    .setDescription('Fjern en person fra ticket')
    .addUserOption(option =>
      option.setName('person')
      .setDescription('Personen der skal fjernes')
      .setRequired(true)),
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(interaction.guildId);
    const chan = guild.channels.cache.get(interaction.channelId);
    const user = interaction.options.getUser('person');

    if (chan.name.includes('ticket')) {
      chan.edit({
        permissionOverwrites: [{
          id: user,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
          {
            id: client.config.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
      ],
      }).then(async () => {
        interaction.reply({
          content: `<@${user.id}> blev tilføjet til ticket!`
        });
      });
    } else {
      interaction.reply({
        content: 'Du er ikke i en ticket!',
        ephemeral: true
      });
    };
  },
};
