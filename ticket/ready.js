const { ticketChannel, footerText } = require('../botconfig.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
  name: 'ready',
  async execute(client) {
    const oniChan = client.channels.cache.get(ticketChannel)

    function sendTicketMSG() {
      const embed = new MessageEmbed()
        .setColor('6d6ee8')
        .setAuthor({ name: 'Ticket', iconURL: client.user.avatarURL() })
        .setDescription('Har du brug for at komme i kontakt med vores staff, dev, eller ledelses team skal du lave en ticket.\n\nNår du har lavet en ticket så kommer der en dropdown menu hvor du skal vælge den kategori der passer bedst til dit spørgsmål/problem\nHvis du ikke vælger en kategori så vil din ticket blive lukket automatisk.\nVælger du en forkert kategori så kan og vil din ticket blive lukket uden advarsel.\n\nDu kan lave en ticket ved at trykke på knappen nedenfor.')
        .setFooter(footerText, client.user.avatarURL())
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('open-ticket')
            .setLabel('Åben ticket')
            .setEmoji('✉️')
            .setStyle('PRIMARY'),
        );

      oniChan.send({
        embeds: [embed],
        components: [row]
      })
    }

    const toDelete = 10000;

    async function fetchMore(channel, limit) {
      if (!channel) {
        throw new Error(`Expected channel, got ${typeof channel}.`);
      }
      if (limit <= 100) {
        return channel.messages.fetch({
          limit
        });
      }

      let collection = [];
      let lastId = null;
      let options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
          break;
        }

        collection = collection.concat(messages);
        lastId = messages.last().id;
      }
      collection.remaining = remaining;

      return collection;
    }

    const list = await fetchMore(oniChan, toDelete);

    let i = 1;

    list.forEach(underList => {
      underList.forEach(msg => {
        i++;
        if (i < toDelete) {
          setTimeout(function () {
            msg.delete()
          }, 1000 * i)
        }
      })
    })

    setTimeout(() => {
      sendTicketMSG()
    }, i);
  },
};
