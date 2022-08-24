const { footerText } = require("../botconfig.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afstemning')
        .setDescription('Laver en afstemning og sætter en bestem tid af hvor efter den afsluttes')
        .addStringOption(option => option.setName('title').setDescription('Hvad skal der stå titlen?').setRequired(true))
        .addStringOption(option => option.setName('tekst').setDescription('Hvad skal der stemmes om?').setRequired(true)),

    async execute(interaction) {
        /*
        * TODO Gør så man kan sætte et tidspunkt den skal slutte
        *   og så når den er slut så hvor mange stemmer der er
        *   og den der har flest har vundet
        */

        let Embed = new MessageEmbed()
            .setTitle(interaction.options.getString('title'))
            .setColor("#2186ba")
            .setDescription(interaction.options.getString('tekst'))
            .setFooter({ text: footerText })

        /*var d = new Date();
        var m = d.getMinutes();
        var h = d.getHours();
        var s = d.getSeconds();
        if (hours >= 12 && hours <= 21) {
            console.log('We Are Closed');
        } else {
            console.log('We are Open');
        }
        // Slutter klokken 15:25
        if (timer >= 15 && timer <= 24) {
            if (minutter >= 25 && minutter <= 59) {
                interaction.edit('Så er den afsluttet');
            }        
        }*/


        await interaction.channel.send({ embeds: [Embed] }).then((interaction) => {
            interaction.react('👍')
                .then(() => interaction.react('👎'))
        });
    },
};