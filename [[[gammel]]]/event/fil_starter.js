const Discord = require("discord.js");
const botconfig = require('../botconfig.json');
const fs = require("fs")

module.exports = function (bot) {
console.log('Starter filer')
console.log(`--------------------------`);

fs.readdir("./commands/", (err, files) => {  
    if(err) console.log(err);  

    let jsfile = files.filter(f => f.split(".").pop() === "js")  
    if(jsfile.length <= 0){  
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {  
        let props = require(`../commands/${f}`);   
        console.log(`Loaded command ${f}.`);  
        console.log(`--------------------------`);  
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);  
    });
});

fs.readdir("./utility/", (err, files) => {  
    if(err) console.log(err);  

    let jsfile = files.filter(f => f.split(".").pop() === "js")  
    if(jsfile.length <= 0){  
        console.log("Couldn't find utility.");  
        
        return;
    }

    jsfile.forEach((f, i) => {  
        let props = require(`../utility/${f}`);   
        console.log(`Loaded command ${f}.`);  
        console.log(`--------------------------`);  
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);  
    });
});


//fs.readdir("../ticket_system/", (err, files) => {  
//    if(err) console.log(err);  
//
//    let jsfile = files.filter(f => f.split(".").pop() === "js")  
//    if(jsfile.length <= 0){  
//        console.log("Couldn't find commands.");  
//        
//        return;
//    }
//
//    jsfile.forEach((f, i) => {  
//        let props = require(`./ticket_system/${f}`);   
//        console.log(`Loaded ticket commands ${f}.`);  
//        console.log(`--------------------------`);  
//        bot.commands.set(props.help.name, props);
//        bot.commands.set(props.help.name2, props);
//        bot.commands.set(props.help.name3, props);  
//    });
//});

};