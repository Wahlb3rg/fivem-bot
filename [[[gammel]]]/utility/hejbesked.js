const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {

  let roleEveryone = message.guild.roles.cache.find(role => role.name === "@everyone");

  message.guild.channels.create(`besked-fra-bot`, {
    type: 'text',
    permissionOverwrites: [
       {
         id: roleEveryone.id,
         deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
      },
    ],
  }).then(c => {

moveTicket(c)
c.setTopic(`Dette er en kanal til at fortælle hvem jeg er og hvad jeg kan -- Hilsen den bedste bot du nogne sinde kommer til at få :)`)

const embed = new Discord.MessageEmbed()
.setColor(0xff00ff)
.setTitle('Kære ejere af **Colorado RP**')
.setDescription(`Jeg er en bot der er lavet helt fra bunden af Wahlberg jeg er kommet herind pga. 𝕿𝖍0𝖒𝖒𝖊𝖗𝖓 min service er gratis for jer, med den betingelse at wahlberg får staff in game når i åbner.\n\n Angående at være online så kommer botten til at være online når Wahlbergs pc er tændt men hvis i gerne vil have den til at være online 24/7 så vil der være mulighed for at få den ind på jeres vps, Wahlberg skal nok sørge for alt bliver sat op og køre som det skal.\n\nHvis i har et script i gerne vil have ind så skriv endelig en DM til wahlberg#6270 med forslaget\n\nSom i kan se her jeg ikke et logo lige nu men hvis der er en der bare sender logoet her i denne chat og andre billider i bruger så jeg kan bruge dem så vil det være helt perfekt. Jeg skal også have et navn det skriver i også bere i denne chat og så bliver det sat ind ASAP.\n\nDISCLAIMER Jeg kan ikke afspille musik som rythem og jeg kan heller ikke holde styr på lvl som mee6`)
.setFooter(`Lavet af wahlberg#6270`)

const embed2 = new Discord.MessageEmbed()
.setColor(0xff00ff)
.setTitle(`Hvad kan jeg`)
.setDescription(`Jeg har 20+ scripts som er lavet fra bunden af Wahlberg eller modificeret til at passe ind til den server han laver mig til`)
.addField('\u200B', '\u200B')
.addField('Commands', 'Her er disse som man skal bruge aktivt med en commnd i chaten')
.addField('Changelog/Fællesbesked', 'Denne command er til man kan sende changelog eller en fællesbesked ud i en embed (den kasse denne text står i)')
.addField('Ip', 'Den siger lidt sig selv den command der giver ip\'en til serveren og Teamspeak hvis det kommer ind på serveren eller hjemmesiden hvis i får sådan en')
.addField('Status', 'Denne command kan vise hvem og hvor mange der er inde på serveren')
.addField('Support', 'Den her giver også sig selv den er til at tilkalde staff')
.addField('Uptime', 'En command der viser hvor lang tid botten har været online')
.addField('Userinfo', 'En command hvor man kan se lidt info om sig selv eller andre')
.addField('Warn/Unwarn/Warnings', 'Disse comands er til at give advarsler fjerne dem igen og den sidste er til at se hvor mange en bruger har')
.addField('Ban/Kick', 'Disse commands bruger man til at kicke og banne folk og så logge det så i som ejer kan se hvem og hvorfor de har fået ban/kick')
.addField('Poll', 'Du kan stille et spørgsmål og så kan folk vote :thumbsup: eller :thumbsdown:')
.addField('slet', 'Denne  command kan bruge til at slette op til 100 beskder som er maks 14 dage gammle(Det er en ting discord har lavet idk why)')
.addField('\u200B', '\u200B')
.addField('Events', 'Disse er ting der sker af sig selv eller med emojicons')
.addField('Join', 'Den her giver en velkommen besked men jeg kan se i ikke har det på med mee6 så den her venter jeg med at aktivere til wahlberg har snakke med jer')
.addField('MemberCount', 'Den tæller antalet af personer på discorden')
.addField('AntiRaid', 'Ligesom det i har nu man skal regere med en emji for at få en role dette kan også laves med tag så i ikke behøver bruge everyone og here og få folk til at leav men kun tag dem der vil have det')
.addField('Antal spillere', 'Den viser hvor mange der er inde på FiveM serveren i dens status eller som en låst voicekanal eller begge')
.addField('\u200B', '\u200B')
.addField('Ticket system', 'Mit ticket system virker ikke lige nu fordi discord har opdateret så jeg er stadig i gang med at omskrive mit script')

.setFooter(`Lavet af wahlberg#6270`)

c.send(embed) .then(c.send(embed2))

}).catch(console.error);
async function moveTicket(c) {
await c.setParent("861309646115045396");//Den cat den skal ligge under
};

/* 
if (this = true) {
          then this
        } else {
            this
        }

*/

}

module.exports.help = {
    name: "jkehkljawheahgejkahgelhjkhsswglk"
}