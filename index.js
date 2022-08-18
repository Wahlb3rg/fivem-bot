const { Client, Intents, Collection } = require('discord.js');
const fs = require("fs"); // bruges til at læse commands fra anden mappe
const botconfig = require('./botconfig.json'); // tager bot config 
const { token } = require('./token.json'); // tager bot config 
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
});

client.once('ready', (client) => { console.log(`Logget ind som ${client.user.username}`) });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.commands = new Collection();

// Slash Commands til alle andre 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Loaded Slash commands ${file}.`); // printer hvilke kommandoer der er loaded
    console.log(`--------------------------`); // printer fin opstilling mellem kommandoer
    client.commands.set(command.data.name, command);
}

// Slash commands til ticket
const eventFiles = fs.readdirSync('./ticket').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./ticket/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
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

/*fs.readdir("./normcommands/", (err, files) => { // læser directory omkring commands
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
});*/

/////////Event///////////////////////////////////////////////////////////////////////////////////////////////////
//Sconst jointocreate1 = require("./jointocreate.js");
//jointocreate1(client);
const velkommen = require("./events/velkommen.js");
velkommen(client);
const botstat = require("./events/status.js");
botstat(client)
const stick = require("./disabled/stickey.js");
stick(client)
const role = require("./events/role-claim.js");
role(client)
const sup = require("./events/support-modal.js");
sup(client)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('messageCreate', async message => {
    /*let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);                                   // Tager args
    let cmd = messageArray[0];                                          // tager det første ord som er lig med kommandoen
    let prefix = botconfig.prefix;                                      // Tager prefixet fra bot config
    let commandfile = client.commands.get(cmd.slice(prefix.length));    // Bruger kommando fra ekstern mappe
    if (commandfile) commandfile.run(client, message, args);*/            // Hvis det er en kommando fra ekstern mappe skal den bruges alligevel

    if (!message.author.bot) {
        if (message.content.includes('support' || 'suport')) {
            await message.reply('Du kan få support ved at bruge comandoen /support eller du kan skrive i kanalen <#848850610794397696>');
        }
    }

    //sletter alle beskeder i ping kanalen 
    if (message.channelId == 842817564290842686) {
        if (!message.content.includes('ping')) {
            if (!message.author.bot) {
                await message.delete();
            }
        }
    }

    //siger botten ikke bruger !commands mere men /
    if (!message.author.bot) {
        if (message.content.startsWith('!')) {
            message.channel.send('Jeg bruger ikke ! commands mere men / så brug / i en chat så kan du se alle de commands jeg kan lave :)')
        }
    }

})
client.login(token)