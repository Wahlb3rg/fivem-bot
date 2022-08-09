const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Fjern en advarsel fra en person')
        .addUserOption(option =>
            option.setName('person')
                .setDescription('Hvem vil du fjerne en advarsel fra')
                .setRequired(true)),
    async execute(interaction) {

        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let wUser = interaction.options.getMember('person');
        warns[wUser.id].warns--;

        fs.writeFile("warnings.json", JSON.stringify(warns, null, 4), (err) => {
            if (err) console.log(err)
        });

        const warnEmbed = new MessageEmbed()
            .setTitle("Fjernet Advarsel")
            .setColor(0x00ff00)
            .addFields(
                { name: 'Fjernet af ', value: `<@${interaction.user.id}> - Hash: ${interaction.user.tag} - ID: ${interaction.user.id}` },
                { name: 'Brugeren', value: `${wUser} - Hash: ${wUser.user.tag} - ID: ${wUser.id}` },
                { name: 'Det nye antal af advarsler er', value: `${warns[wUser.id].warns}` },
            )

        let warnchannel = interaction.guild.channels.cache.find(channel => channel.id === botconfig.log);
        if (!warnchannel) return console.log("Channel not found (Config: 'warning_logs_channel')");

        warnchannel.send({ embeds: [warnEmbed] });
        await interaction.reply({ content: `Du har fjernet 1 advarsel fra <@${wUser.id}>`, ephemeral: true });


    },
};