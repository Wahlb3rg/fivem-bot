const config = require("../botconfig");
module.exports = function (client) {
    console.log(`Blah Blah start`)
    console.log(`--------------------------`);


    const guildID = '825000372710932490'  

    const getApp = (guildID) => {
        const app = client.api.applications(client.user.id)
        if (guildID) {
            app.guilds(guildID)
        }
        return app
    }

    client.on('ready', async () =>{ 
   
        const commands = await getApp(guildID).commands.get()
        console.log(commands)

        await getApp(guildID).commands.post({
            data: {
                name: 'test',
                description: 'this one is a test',
            },
        })

        client.ws.on('INTERACTION_CREATE', async (interaction) =>{
            const command = interaction.data.name.toLowerCase()

            console.log(command)
        })
    })
};