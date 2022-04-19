const { Client, Intents, Collection, Formatters, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require("fs"); // bruges til at læse commands fra anden mappe

const botconfig = require('./botconfig.json'); // tager bot config 
const token = require('./token.json'); // tager bot config 
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
}); // botten er lig med dens client

client.once('ready', (client) => { console.log(`Logget ind som ${client.user.username}`) });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Loaded Slash commands ${file}.`); // printer hvilke kommandoer der er loaded
    console.log(`--------------------------`); // printer fin opstilling mellem kommandoer
    client.commands.set(command.data.name, command);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
        //console.log(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Der var en fejl under udførelsen af denne kommando!\nHvis denne fejl ikke forsvinder så kontakt wahlberg', ephemeral: true });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const discordModals = require('discord-modals')
discordModals(client);

const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method
const modal = new Modal() // We create a Modal
    .setCustomId('suportmodalID') // We set the custom ID
    .setTitle('Support')
    .addComponents([
        new TextInputComponent() // We create a Text Input Component
            .setCustomId('suporttekstID')
            .setLabel('Beskriv dit problem')
            .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
            .setMinLength(1)//25
            .setMaxLength(500)
            .setPlaceholder('Der var en bug og jeg har mistet mine penge')
            .setRequired(true) // If it's required or not
    ])
    .addComponents([
        new TextInputComponent() // We create a Text Input Component
            .setCustomId('suporttekstID2')
            .setLabel('Beskriv dit problem')
            .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
            .setMinLength(1)//25
            .setMaxLength(500)
            .setPlaceholder('Der var en bug og jeg har mistet mine penge')
            .setRequired(true) // If it's required or not
    ])
    .addComponents([
        new TextInputComponent() // We create a Text Input Component
            .setCustomId('suporttekstID3')
            .setLabel('Beskriv dit problem')
            .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
            .setMinLength(1)//25
            .setMaxLength(500)
            .setPlaceholder('Der var en bug og jeg har mistet mine penge')
            .setRequired(true) // If it's required or not
    ])

client.on('interactionCreate', (interaction) => {
    // Let's say the interaction will be a Slash Command called 'support'.
    if (interaction.commandName === 'support') {
        showModal(modal, {
            client: client, // Client to show the Modal through the Discord API.
            interaction: interaction // Show the modal with interaction data.
        })
    }

});

client.on('modalSubmit', async (modal) => {
    if (modal.customId === 'suportmodalID' && 'suporttekstID2' && 'suporttekstID3') {
        const firstResponse = modal.getTextInputValue('suporttekstID')
        const secondResponse = modal.getTextInputValue('suporttekstID2')
        const thirdResponse = modal.getTextInputValue('suporttekstID3')
        modal.reply('Congrats! Powered by discord-modals.' + Formatters.codeBlock('markdown', firstResponse + secondResponse + thirdResponse))
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

fs.readdir("./normcommands/", (err, files) => { // læser directory omkring commands
    if (err) console.log(err); //logger hvis der er fejl
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) { // hvis der er mindre eller lig med nul js filer kan den ikke finde kommandoerne da der ingen kommandoer er
        console.log("Couldn't find commands."); // logger fejl
        return;
    }
    jsfile.forEach((f, i) => { // tager hver java fil
        let props = require(`./normcommands/${f}`);  //finder directory
        console.log(`Loaded normcommands ${f}.`); // printer hvilke kommandoer der er loaded
        console.log(`--------------------------`); // printer fin opstilling mellem kommandoer
        client.commands.set(props.help.name, props);
        client.commands.set(props.help.name2, props);
        client.commands.set(props.help.name3, props); //tillader brug af kommandoer fra ekstern mappe
    });
});

fs.readdir("./admin/", (err, files) => { // læser directory omkring commands
    if (err) console.log(err); //logger hvis der er fejl
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) { // hvis der er mindre eller lig med nul js filer kan den ikke finde kommandoerne da der ingen kommandoer er
        console.log("Couldn't find commands."); // logger fejl
        return;
    }
    jsfile.forEach((f, i) => { // tager hver java fil
        let props = require(`./admin/${f}`);  //finder directory
        console.log(`Loaded command ${f}.`); // printer hvilke kommandoer der er loaded
        console.log(`--------------------------`); // printer fin opstilling mellem kommandoer
        client.commands.set(props.help.name, props);
        client.commands.set(props.help.name2, props);
        client.commands.set(props.help.name3, props); //tillader brug af kommandoer fra ekstern mappe
    });
});

/////////Event///////////////////////////////////////////////////////////////////////////////////////////////////
//Sconst jointocreate1 = require("./jointocreate.js");
//jointocreate1(client);
const velkommen = require("./events/velkommen.js");
velkommen(client);
const botstat = require("./events/status.js");
botstat(client)
//const sup = require("./commands/support.js")
//sup(client)
const stick = require("./disabled/stickey.js");
stick(client)
const role = require("./events/role-claim.js");
role(client)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('messageCreate', async message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);                                   // Tager args
    let cmd = messageArray[0];                                          // tager det første ord som er lig med kommandoen
    let prefix = botconfig.prefix;                                      // Tager prefixet fra bot config
    let commandfile = client.commands.get(cmd.slice(prefix.length));    // Bruger kommando fra ekstern mappe
    if (commandfile) commandfile.run(client, message, args);            // Hvis det er en kommando fra ekstern mappe skal den bruges alligevel

    if (!message.author.bot) {
        if (message.content.includes('support' || 'suport')) {
            message.reply('Du kan få support ved at bruge comandoen /support eller du kan skrive i kanalen <#848850610794397696>');
        }
    }
})
client.login(token.token)