const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
   data: new SlashCommandBuilder()
      .setName("timeout")
      .setDescription("Timeout en person")
      .addUserOption((option) => option.setName("member")
         .setDescription('Brugernen du vil give timeout')
         .setRequired(true))

      .addStringOption((option) => option.setName("time")
         .setDescription('Hvor lang tid')
         .setRequired(true))

      .addStringOption((option) => option.setName("reason")
         .setDescription('Reason to put member in timeout')),


   async execute(interaction) {
      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "You do not have permission to use this command." });

      const member = interaction.options.getMember('member')
      const reason = interaction.options.getString('reason') || null
      const time = ms(interaction.options.getString('time'))

      if (!time) return interaction.followUp({ content: "Given time is not valid, it is necessary that you provide valid time." })
      const response = await member.timeout(time, reason)

      if (!response) return interaction.followUp({ content: "I am sorry but for some reason I am unable to timeout this member." })
      return interaction.followUp({ content: `${member} has been timed out for ${ms(time, { long: true })}` })


   }
}