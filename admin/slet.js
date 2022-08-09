module.exports.run = async (bot, message, args) => {

message.channel.send(`Denne command er Dsv. WIP`)

//(!message.member.hasPermission("MANAGE_MESSAGES")

//    if(!message.guild.roles.cache.find(role => role.name === "Staff")) return message.channel.send("Du har ikke rank til dette.").then(msg => msg.delete({ timeout: 10000 }))
//    if(!message.channels.cache.get(`842471936952631336`)) return message.channel.send("Du kan ikke fjerne beskeder fra denne kanal").then(msg => msg.delete({ timeout: 10000 }))
//    
//    if(!args[0]) return message.channel.send("Du skal bruge et tal for eksempel. `slet 5`.").then(msg => msg.delete({ timeout: 5000 }))
//    message.channel.bulkDelete(args[0]).then(() => {
//    
//        message.channel.send(`Slettede ${args[0]} beskeder.`).then(msg => msg.delete({ timeout: 5000 }))
//    });

}

module.exports.help = {
    name: "slet" //NAVNET ER LIG MED KOMMANDOEN
}