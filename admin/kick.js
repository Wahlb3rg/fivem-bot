const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick enperson.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Person der skal have kick')
      .setRequired(true))
    .addStringOption(option =>
        option.setName('raison')
        .setDescription('Grund til kick')
        .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'Den person, du vil kicke, er over dig !',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: 'Den person du prøver at kicke kan ikke kickes!',
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      await user.kick(interaction.options.getString('raison'))
      interaction.reply({
        content: `**${user.user.tag}** Blev kicket!`
      });
    } else {
      await user.kick()
      interaction.reply({
        content: `**${user.user.tag}** A été kick avec succès !`
      });
    };
  },
};