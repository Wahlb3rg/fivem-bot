const config = require("../botconfig");
module.exports = function (client) {
    client.on('ready', async () =>{ 
    console.log(`${client.user.username} er nu online.`);
        client.user.setActivity('Den bedste bot i den danske verden', { type: 'COMPETING', status: 'idle' });
    });
}