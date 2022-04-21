const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Giv en advarsel til en bruger')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Den bruger du vil warn')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('input')
                .setDescription('Grundnen for warn')
                .setRequired(true)),

    async execute(interaction) {

        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let wUser = interaction.options.getMember('target');
        let reason = interaction.options.getString('input');
        if (!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };
        warns[wUser.id].warns++;

        fs.writeFile("warnings.json", JSON.stringify(warns, null, 4), (err) => {
            if (err) console.log(err)
        });

        let warnEmbed = new MessageEmbed()
            .setTitle("Ny Advarsel")
            .setAuthor({ name: interaction.user.username })
            .setColor("#fc6400")
            .addFields(
                { name: 'Advaret af', value: `<@${interaction.user.id}> - Hash: ${interaction.user.tag} - ID: ${interaction.user.id}` },
                { name: 'Brugeren', value: `${wUser} - Hash: ${wUser.user.tag} - ID: ${wUser.id}` },
                { name: 'Fik advarslen i', value: `${interaction.channel} - ID: ${interaction.channel.id}` },
                { name: 'Antal advarsler', value: `${warns[wUser.id].warns}` },
                { name: 'Grundlag', value: `\`\`\`${reason}\`\`\`` },
                
                //{ name: '\u200B', value: '\u200B' },
            )

        let warnChannel = interaction.guild.channels.cache.find(channel => channel.id === botconfig.log);
        if (!warnChannel) return console.log("Channel not found (Config: 'warning_logs_channel')");

        warnChannel.send({ embeds: [warnEmbed] });

        if (warns[wUser.id].warns >= 1) {
            interaction.channel.send(`<@${wUser.id}> har fået en advarsel. Tjek din dm for at se hvorfor eller lav en ticket hvis din dm er lukket.`);
            
            try {
                await wUser.send(`**Notification** Det her er en notification på du er blevet advaret af ${interaction.user.username}' grund(e): \`\`\`${reason}\`\`\``)
            } catch (e) {
                // console.log(e.stack);
                console.log('\x1b[33m%s\x1b[0m', "I tried to DM a new user, but their DM's are locked.");
            }
        }
        await interaction.reply({
            content: `Du har givet en advarsel til <@${wUser.id}> grundlaget: **${reason}**`,
            ephemeral: true
        });

    },
};