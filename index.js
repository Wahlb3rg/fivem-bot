const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
}); // botten er lig med dens client

const botconfig = require('./botconfig.json'); // tager bot config 
const fs = require("fs"); // bruges til at læse commands fra anden mappe
client.commands = new Discord.Collection(); // tillader brug af kommando fra ekstern mappe

client.on('ready', () => {console.log(`Logget ind som ${client.user.username}`)});


fs.readdir("./commands/", (err, files) => { // læser directory omkring commands
    if (err) console.log(err); //logger hvis der er fejl

    let jsfile = files.filter(f => f.split(".").pop() === "js") //søger js filer
    if (jsfile.length <= 0) { // hvis der er mindre eller lig med nul js filer kan den ikke finde kommandoerne da der ingen kommandoer er
        console.log("Couldn't find commands."); // logger fejl
        return;
    }
    jsfile.forEach((f, i) => { // tager hver java fil
        let props = require(`./commands/${f}`);  //finder directory
        console.log(`Loaded command ${f}.`); // printer hvilke kommandoer der er loaded
        console.log(`--------------------------`); // printer fin opstilling mellem kommandoer
        client.commands.set(props.help.name, props);
        client.commands.set(props.help.name2, props);
        client.commands.set(props.help.name3, props); //tillader brug af kommandoer fra ekstern mappe
    });
});

fs.readdir("./admin/", (err, files) => { // læser directory omkring commands
    if (err) console.log(err); //logger hvis der er fejl

    let jsfile = files.filter(f => f.split(".").pop() === "js") //søger js filer
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
//const start = require("./events/start");
//start(client);
const velkommen = require("./events/velkommen.js");
velkommen(client);
const botstat = require("./events/status.js");
botstat(client)
const sup = require("./events/support.js")
sup(client)
//const stick = require("./disabled/stickey.js");
//stick(client)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on('messageCreate', async message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);                                   // Tager args
    let cmd = messageArray[0];                                          // tager det første ord som er lig med kommandoen
    let prefix = botconfig.prefix;                                      // Tager prefixet fra bot config
    let commandfile = client.commands.get(cmd.slice(prefix.length));    // Bruger kommando fra ekstern mappe
    if (commandfile) commandfile.run(client, message, args);             // Hvis det er en kommando fra ekstern mappe skal den bruges alligevel
})
client.login(botconfig.token)