const Discord = require('discord.js');
const bot = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
}); 
const fs = require("fs");
const botconfig = require('./botconfig.json');
const fivereborn = require('fivereborn-query');
bot.commands = new Discord.Collection();

const ip = botconfig.ip
const ipport = botconfig.ipport

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
bot.on('voiceStateUpdate', (oldMember, newMember, member) => {
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;

  if(newUserChannel === "826114979093676042") //don't remove ""
  { console.log("Joined vc with id "+newUserChannel);// User Joins a voice channel
  let supportchannel = bot.channels.cache.get('826114574943125534');
      
      let support = new Discord.MessageEmbed()
        .setTitle('Support!')
        .setDescription(`<@${newMember.userID}> har brug for hjælp og sidder i Afventer support`)
        .setColor(0xFFA500)

        supportchannel.send( support)// + `<@${newUserChannel}> `

  } else if(oldUserChannel === "826114979093676042"){
      // User leaves a voice channel
      console.log("Left vc");


  }
});
*/

////////////////////////////////////////NOTER/////////////////////////////////////////////////////////////////////

        

/*bot.on('voiceStateUpdate', (oldMember, newMember, member) => {
    let newUser = newMember.voiceChannelID
    let oldUser = oldMember.voiceChannelID
    let index = 1;
    //let supportchannel = bot.guild.channels.cache.find(channel => channel.id === '826114979093676042');


    if(oldUser === undefined && newUser !== undefined) {

    console.log(`join `)

    } else if(newUser === undefined){
    
        console.log(`leav `)
      // User leaves a voice channel
  
    }
  })*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//bot.on("message", async message => {
//    // Checking if the message author is a bot.
//    if (message.author.bot) return false;
//
//    // Getting the role by ID.
//    const Role1 = message.guild.roles.cache.get("842817228248449074");
//
//    // Creating a filter.
//    const Filter = (reaction, user) => user.id == message.author.id;
//
//    // Creating the embed message.
//    const Embed = new discord.MessageEmbed()
//        .setDescription(`React på dennne besked hvis du ville holde dig opdateret og blive pinget/tagget\nMan vil få en rolle der hedder ${Role1.name} som bliver brugt til at tagge istedet for everyone`)
//    
//    // Awaiting for the embed message to be sent.
//    const reactionMessage = await message.channel.send(Embed);
//
//    // Reacting to the embed message.
//    await reactionMessage.react("✅");
//
//    // Awaiting a reaction to the embed message. Time is measured in ms. (30000 ms - 30 seconds)
//    reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
//        // Getting the first reaction in the collection.
//        const reaction = collected.first();
//        
//        // Creating a switch statement for reaction.emoji.name.
//        switch (reaction.emoji.name) {
//            case "✅":
//                // Checking if the member already has the role.
//                if (message.member.roles.cache.has(Role1.id)) {return message.channel.send("You already have the role.")};
//                // Adding the role.
//                message.member.roles.add(Role1).then(message.channel.send("Role added!"));
//                // Breaking the switch statement to make sure no other cases are executed.
//                break
//        }
//    })
//});
{
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//bot.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
//    if (newVoiceState.channel.id == "805879985461526548") { // The member connected to a channel.
//        console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
//    } else if (oldVoiceState.channel) { // The member disconnected from a channel.
//        console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
//    };
//});

//bot.on('messageReactionAdd', (reaction, user, async) => {
//    let message = reaction.message, emoji = reaction.emoji;
//    const channelID = '782991106638872587'
//
//if (reaction.message.channel.id === channelID){
//    
//    if (emoji.name == '🎫') {
//        // We don't have the member, but only the user...
//        // Thanks to the previous part, we know how to fetch it
//        message.guild.members.fetch(user.id).then(member => {
//
//        message.channel.send(`Hej ${member} denne fuktion er på vej\nHæng i der ude`).then(msg => {msg.delete({ timeout: 60000 })})
//
////            if (!message.guild.roles.cache.get("806625288569356370")) return message.channel.send(`Role \`erro 4013\` kontakt wahlberg#6270 `).then(msg => msg.delete({ timeout: 15000 }));
////                
////                let roleSupportRole = message.guild.roles.cache.get("806625288569356370");
////                let roleEveryone = message.guild.roles.cache.find(role => role.name === "@everyone");
////            
////    //            message.guild.channels.create(`ticket-${user.username}`, { type: 'text', permissionOverwrites: permissionOverwriteArray, reason: 'New channel added for fun!' }).then(c => {//
////                    message.guild.channels.create(`ticket-${user.username}`, {
////                        type: 'text',
////                        permissionOverwrites: [
////                           {
////                             id: roleEveryone.id,
////                             deny: ['VIEW_CHANNEL'],
////                             deny: ['SEND_MESSAGES']
////                          },
////                          {
////                            id: roleSupportRole.id,
////                            allow: ['VIEW_CHANNEL'],
////                            allow: ['SEND_MESSAGES'],
////                          },
////                          {
////                            id: member,
////                            allow: ['VIEW_CHANNEL'],
////                            allow: ['SEND_MESSAGES'],
////                          },
////                        ],
////                      }).then(c => {
////                
////                    moveTicket(c)
////                
//// //               c.overwritePermissions(roleSupportRole, {
//// //                   SEND_MESSAGES: true,
//// //                   READ_MESSAGES: true
//// //               });
//// //               c.overwritePermissions(roleEveryone, {
//// //                   SEND_MESSAGES: false,
//// //                   READ_MESSAGES: false
//// //               });
//// //               c.overwritePermissions(member, {
//// //                   SEND_MESSAGES: true,
//// //                   READ_MESSAGES: true
//// //               });
////                c.setTopic(`Ticket ID: ${member.id} | Creator: ${member.username}`)
////                message.channel.send(`:white_check_mark: ***<@${member.id}> Din ticket er lavet, <#${c.id}>.***`).then(msg => msg.delete({ timeout: 15000 }));
////                const embed = new Discord.MessageEmbed()
////                    .setColor(0xffff00)
////                    .setDescription(`**Kære <@${member.id}>!**\n\nTak fordi du kontakter vores supportteam! \n Vi vender tilbage til dig så hurtigt som muligt. \n`
////                    + `For at lukke denne ticket skriv \`!luk\`.`
////                    + `Hvis du skal bruge en anden bruger med inde i den pågældende ticket\`!tilføj\``
////                    + `Hvis du skal fjerne en bruger igen\`!fjern\``
////                    + `Du kan omdøbe navnet på kanalen\`!omdøb\``)
////                    .setTimestamp()
////                    .setFooter(`Lavet af wahlberg#6270`)
////                c.send(embed)
////        
////                if(true) {
////                    if(!message.guild.channels.cache.find(channel => channel.name === c.id)) return
////                    const filter = m => m.author.id === message.author.id;
////                    c.awaitMessages(filter, { max: 1, time: ms('10m') }).then(idfk => {
////                        c.send("Hej, \nTak for at lave en ticket! Vi vil være sikker på at svare dig, så snart en support er tilgængeligt")
////                    })
////                }
////            }).catch(console.error);
////            async function moveTicket(c) {
////                await c.setParent("783000050963447809");
////            };
//
//        });
//}
//
////else if (emoji.name == 'Ping') {
////        message.guild.members.fetch(user.id).then(member => {
////            message.channel.send(`Hej ${member} denne fuktion er på vej\nHæng i der ude`).then(msg => {msg.delete({ timeout: 60000 })})
////            
////        });
////}
//
//
//else if (emoji.name == '👷‍♂️') {
//    message.guild.members.fetch(user.id).then(member => {
//        var supportEmbed = new Discord.MessageEmbed()
//        .setTitle('__***SUPPORT***__')
//        .setDescription(`<@${user.id}> har tilkald Staff. Du kan nu sætte dig i __*Afventer support*__, så vil en support tage din case så hurtigt som muligt`)
//        .setColor(0xff0000)
//        .setFooter('Lavet af wahlberg#6270')
//         message.channel.send( '|| <@&806625288569356370> Hvorfor kiger du her... Wirdo ||', supportEmbed ).then(msg => {msg.delete({ timeout: 600000 })});
//
//    });
//}
//
//}
////message.reactions.cache.get('816575415530291233').reaction.users.remove().catch(error => console.error('Failed to remove reactions: ', error));
//
//reaction.users.remove(user.id).catch(console.error);
//
//
//// Remove the user's reaction1️⃣2️⃣3️⃣4️⃣
////reaction.remove(user);React with :four: to make a purchase support
//
//});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


function activity(){ 
  setTimeout(() => { 
      fivereborn.query(ip, ipport, (err, data) => { 
          if (err) { 
            console.log(err);
            console.log(data);
          } else { 
              if(data.clients <= 5){
              bot.user.setActivity(`Få folk i byen`, { type: "WATCHING", status: 'online' }).catch(error => console.log(error));;
            } else if(data.clients == 32) {
              bot.user.setActivity(`Byen er helt fyldt op `, { type: "WATCHING", status: 'online' }).catch(error => console.log(error));;  
            } else {
              bot.user.setActivity(`${data.clients} i byen`, { type: "WATCHING", status: 'online' }).catch(error => console.log(error));;  
            }
          }
          if(err) console.log(err);
          
      });
      activity(); 
  }, 1000);
}
activity();

/////////Event///////////////////////////////////////////////////////////////////////////////////////////////////
const jointocreate1 = require("./event/jointocreate.js");
jointocreate1(bot);
const start = require("./event/start");
start(bot);
const join = require("./event/join");
join(bot);
const fil = require("./event/fil_starter.js");
fil(bot);
//const memberCounts = require("./event/memberCount")
//memberCounts(bot);

//const tester = require("./event/tester")
//tester(bot);
//const ticket = require("./ticketv2/ticket")
//ticket(bot);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


bot.on('message', async message =>{
    let messageArray = message.content.split(" "); 
    let args = messageArray.slice(1);
    let cmd = messageArray[0];
    let prefix = botconfig.prefix;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)); 
    if(commandfile) commandfile.run(bot, message, args); 
})

bot.login(botconfig.token + ".YZyRqQ.x3-6gZQIan0OOmIwD2SxftRjhbI")