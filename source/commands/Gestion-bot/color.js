const { resolveColor, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'color',
  aliases: ['theme'],
  description: 'Change la couleur de l\'embed du bot sur le serveur',
  run: async (client, message, args) => {
   
    
    if (!args[0]) return message.channel.send(`${await client.lang('color.erreur')} \`${client.prefix}color <color>\``);

    const colorMap = {
      "rouge": "#FF0000",
      "vert": "#00FF00",
      "bleu": "#0000FF",
      "noir": "#000000",
      "blanc": "#FFFFFF",
      "rose": "#dc14eb",
      "violet": "#764686",
      "orange": "#FFA500",
      "jaune": "#FFFF00",
      "marron": "#A52A2A",
      "gris": "#808080",
      "argent": "#C0C0C0",
      "cyan": "#00FFFF",
      "lavande": "#E6E6FA",
      "corail": "#FF7F50",
      "beige": "#F5F5DC",
      "defaut": client.config.default_color
    }

    const colorArg = args[0].toLowerCase();

    if (colorArg in colorMap) {
      const embed = new EmbedBuilder()
        .setFooter(client.footer)
        .setTitle(await client.lang('color.embedset'))
        .setColor(colorMap[colorArg]);

      client.db.set(`color_${message.guild.id}`, colorMap[colorArg]);
      return message.channel.send({ content: `${await client.lang('color.set')} \`${colorArg}\`.`, embeds: [embed] });
    } else {
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (colorRegex.test(colorArg)) {
        const resolvedColor = resolveColor(colorArg);
        if (resolvedColor !== null) {
          const embed = new EmbedBuilder()
            .setFooter(client.footer)
            .setTitle(await client.lang('color.embedset'))
            .setColor(resolvedColor);

          client.db.set(`color_${message.guild.id}`, resolvedColor);
          return message.channel.send({ content: `${await client.lang('color.set')} \`${colorArg}\`.`, embeds: [embed] });
        }
      }

      return message.channel.send(`${await client.lang('color.invalide')}`);
    }
  }
}
