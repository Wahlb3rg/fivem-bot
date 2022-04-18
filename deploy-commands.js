const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId } = require('./botconfig.json');
const { token } = require('./token.json');

const commands = [
	new SlashCommandBuilder().setName('support').setDescription('Det her er en support command'),//Den her er til support modal ting ting
]
	.map(command => command.toJSON());

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(`Loaded Slash commands ${file}.`); // printer hvilke kommandoer der er loaded
	console.log(`--------------------------`); // printer fin opstilling mellem kommandoer
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Så er de commands blevet opdateret.'))
	.catch(console.error);