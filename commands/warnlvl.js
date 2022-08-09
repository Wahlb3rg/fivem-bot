const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const botconfig = require("../botconfig.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnlvl')
        .setDescription('Viser hvor mange advarsler en bruger har fået')
        .addUserOption(option =>
            option.setName('person')
                .setDescription('Hvem vil du tjekke')
                .setRequired(true)),
    async execute(interaction) {

        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let wUser = interaction.options.getMember('person');
              
        if (!warns[wUser.id] || warns[wUser.id].warns === 0) {
            await interaction.reply({ content: `Denne person har ingen advarsler \nKeep up the good behavior`, ephemeral: false });
        } else {
            await interaction.reply({ content: `<@${wUser.id}> har ${warns[wUser.id].warns} advarsler`, ephemeral: true });
        }
    },
};